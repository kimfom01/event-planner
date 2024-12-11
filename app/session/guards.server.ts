import { redirect } from "@remix-run/node";
import { getUserIdFromSession } from "./session.server";
import { db } from "~/utils/db.server";

export const requireUser = async (request: Request) => {
  const userId = await getUserIdFromSession(request);

  if (!userId) {
    throw redirect("/auth");
  }

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw redirect("/auth");
  }

  return user;
};
