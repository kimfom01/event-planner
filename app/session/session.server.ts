import { createCookieSessionStorage } from "@remix-run/node";
import { User } from "~/models/User";

const { commitSession, destroySession, getSession } =
  createCookieSessionStorage({
    cookie: {
      name: "_auth",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      secrets: ["secure", "sexy", "secret"],
    },
  });

export const storeUserInSession = async (user: Pick<User, "id">) => {
  const session = await getSession();

  session.set("userId", user.id);

  const header = await commitSession(session);

  return header;
};

export const getUserIdFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  return session.get("userId");
};
