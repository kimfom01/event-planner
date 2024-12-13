import { ActionFunction, ActionFunctionArgs } from "react-router";
import { authenticator } from "~/utils/auth.server";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  await authenticator.authenticate("google-auth", request);
};
