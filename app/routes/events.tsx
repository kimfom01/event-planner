import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { Event } from "~/models/Event";

export const loader: LoaderFunction = async () => {
  const events: Event[] = await db.event.findMany({
    where: {
      eventDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return Response.json(events);
};

const Events = () => {
  const events = useLoaderData<Event[]>();

  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-4">
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="text-2xl font-bold">
          <span>Upcoming Events</span>&nbsp;
          <Link
            to={`create`}
            className="text-xs p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
          >
            Create New Event
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {events.map((event) => {
            return (
              <div
                key={event.id}
                className="border border-slate-800 w-fit p-4 flex flex-col gap-4 rounded-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <div className="font-bold">Title:</div>
                      <div>{event.title}</div>
                    </div>
                    <div className="line-clamp-2 text-sm">{event.description}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <div className="font-bold">Location:</div>
                      <div>{event.location}</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-bold">Date:</div>
                      <div>{new Date(event.eventDate).toDateString()}</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-bold">Time:</div>
                      <div>{new Date(event.eventDate).toTimeString()}</div>
                    </div>
                  </div>
                  <Link
                    to={`${event.id}`}
                    className="bg-slate-700 hover:bg-slate-600 self-end py-1 px-2 rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="order-first md:order-last">
        <Outlet />
      </div>
    </div>
  );
};

export default Events;
