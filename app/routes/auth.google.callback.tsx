import { LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { storeUserInSession } from "~/session/session.server";
import { authenticator } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const user = await authenticator.authenticate("google-auth", request);

  const header = await storeUserInSession(user);

  return redirect("/events", {
    headers: {
      "Set-Cookie": header,
    },
  });
};
