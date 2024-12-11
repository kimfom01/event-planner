import { OAuth2Tokens } from "arctic";
import { User } from "~/models/User";
import { db } from "~/utils/db.server";

export const getOrCreateUser = async (tokens: OAuth2Tokens) => {
  const response = await fetch(
    `${process.env.GOOGLE_USER_ENDPOINT}?access_token=${tokens.accessToken()}`
  );

  const { email }: { email: string } = await response.json();

  const user: User | null = await db.user.findFirst({
    where: {
      emailAddress: email,
    },
  });

  if (user) {
    return user;
  }

  const newUser = await db.user.create({
    data: {
      emailAddress: email,
    },
  });
  return newUser;
};
