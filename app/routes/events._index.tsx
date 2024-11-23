import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import ReactModal from "react-modal";

import { db } from "~/utils/db.server";
import { Event } from "~/models/Event";

const modalStyle = {
  content: {
    display: "flex",
    gap: "20",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
    backgroundColor: "white",
    border: "2px solid rgb(240, 240, 240)",
    borderRadius: "12px",
    position: "absolute",
    height: "fit-content",
    width: "300px",
    top: "120px",
    left: "calc(50% - 150px)",
  } as React.CSSProperties,
};

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
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4">
      <div className="text-2xl font-bold">
        <span>Upcoming Events</span>&nbsp;
        <button
          className="text-xs p-2 border border-slate-700 rounded-lg"
          onClick={openModal}
        >
          Create New Event
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {events.map((event) => {
          return (
            <div
              key={event.id}
              className="border border-slate-800 w-fit p-4 flex flex-col gap-4 rounded-lg"
            >
              <div className="flex flex-col justify-between">
                <div className="flex gap-4">
                  <div className="font-bold">Location:</div>
                  <div>{event.location}</div>
                </div>
                <div className="flex gap-4">
                  <div className="font-bold">Date & Time:</div>
                  <div>{new Date(event.eventDate).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="line-clamp-3">{event.description}</div>
                <Link to={`${event.id}`} className="self-end">
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <ReactModal
        isOpen={isOpen}
        style={modalStyle}
        onRequestClose={closeModal}
      >
        <div className="text-slate-950 flex gap-4 w-full">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-transparent border-slate-950 w-full"
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default Events;
