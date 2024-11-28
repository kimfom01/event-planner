import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { User } from "~/models/User";
import { getOrCreateUser } from "~/lib/user-utils";

export const authenticator = new Authenticator<User>();

authenticator.use(
  new OAuth2Strategy(
    {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      authorizationEndpoint: process.env.GOOGLE_AUTH_ENDPOINT as string,
      tokenEndpoint: process.env.GOOGLE_TOKEN_ENDPOINT as string,
      redirectURI: process.env.GOOGLE_REDIRECT_URI as string,

      scopes: ["openid", "email", "profile"],
    },
    async ({ tokens }) => {
      return await getOrCreateUser(tokens);
    }
  ),
  "google-auth"
);
