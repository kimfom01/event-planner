import { data, LoaderFunction, LoaderFunctionArgs } from "react-router";
import { requireUser } from "~/session/guards.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const user = await requireUser(request);

  return data(user);
};

const Calendar = () => {
  return <div>Calendar</div>;
};

export default Calendar;
