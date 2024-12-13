import { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { Link, Outlet, useLoaderData } from "react-router";

import { db } from "~/utils/db.server";
import { Event } from "~/models/Event";
import { requireUser } from "~/session/guards.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  await requireUser(request);

  const events: Event[] = await db.event.findMany({
    where: {
      eventDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      eventDate: "asc",
    },
  });

  return Response.json(events);
};

const Events = () => {
  const events = useLoaderData<Event[]>();

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] h-fit w-fit gap-4">
      <div className="grid grid-rows-[auto_1fr] h-fit w-fit gap-4">
        <div className="text-2xl font-bold">
          <span>Upcoming Events</span>&nbsp;
          <Link
            to={`create`}
            className="text-xs p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
          >
            Create New Event
          </Link>
        </div>
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {events.map((event) => {
            return (
              <div
                key={event.id}
                className="border border-slate-800 w-full h-full p-4 rounded-lg grid grid-rows-[1fr_auto] gap-4"
              >
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_4fr] gap-2">
                    <div className="font-bold text-sm">Title:</div>
                    <div>{event.title}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-2">
                    <div></div>
                    <div className="line-clamp-1">{event.description}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-2">
                    <div className="font-bold text-sm">Location:</div>
                    <div>{event.location}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-2">
                    <div className="font-bold text-sm">Date:</div>
                    <div>{new Date(event.eventDate).toDateString()}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-2">
                    <div className="font-bold text-sm">Time:</div>
                    <div>{new Date(event.eventDate).toTimeString()}</div>
                  </div>
                </div>
                <Link
                  to={`${event.id}`}
                  className="bg-slate-700 hover:bg-slate-600 self-end py-1 px-2 rounded-lg text-center font-bold"
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="order-first lg:order-last h-fit">
        <Outlet />
      </div>
    </div>
  );
};

export default Events;
