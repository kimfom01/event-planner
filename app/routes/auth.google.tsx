import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  await authenticator.authenticate("google-auth", request);
};
