import {
  createCookieSessionStorage,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const user = await authenticator.authenticate("google-auth", request);

  const url = new URL(request.url);

  const sessionStorage = createCookieSessionStorage({
    cookie: {
      sameSite: "lax",
      domain: url.hostname,
      httpOnly: url.protocol === "https:",
      secure: url.protocol === "https:",
    },
  });

  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  session.set("user", user);

  return redirect("/events", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};
