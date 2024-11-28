import {
  data,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { getUserFromCookies } from "~/lib/user-utils";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const user = await getUserFromCookies(request);

  if (!user) {
    throw redirect("/auth");
  }

  return data(null);
};

const Calendar = () => {
  return <div>Calendar</div>;
};

export default Calendar;
