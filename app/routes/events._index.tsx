import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
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
    width: "fit-content",
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
  const navigation = useNavigation();
  const events = useLoaderData<Event[]>();
  const [isOpen, setIsOpen] = useState(false);

  const isSubmitting = navigation.state === "submitting";

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
                  <div className="font-bold">Date:</div>
                  <div>{new Date(event.eventDate).toDateString()}</div>
                </div>
                <div className="flex gap-4">
                  <div className="font-bold">Time:</div>
                  <div>{new Date(event.eventDate).toTimeString()}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="line-clamp-3 font-bold">
                  {event.description}
                </div>
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
        <Form
          method="POST"
          className="w-full h-full flex flex-col gap-4"
          reloadDocument
        >
          <div className="text-xl text-slate-950 font-bold self-center">
            New Event
          </div>
          <div className="text-slate-950 flex items-center gap-4 w-full">
            <label htmlFor="description" className="font-bold">
              Description:
            </label>
            <textarea
              id="description"
              required
              rows={3}
              name="description"
              className="bg-transparent border border-slate-700 w-full rounded-lg"
            ></textarea>
          </div>
          <div className="text-slate-950 flex items-center gap-4 w-full">
            <label htmlFor="location" className="font-bold">
              Location:
            </label>
            <input
              type="text"
              required
              id="location"
              name="location"
              className="bg-transparent border border-slate-700 w-full rounded-lg"
            />
          </div>
          <div className="text-slate-950 flex items-center gap-4 w-full">
            <label htmlFor="eventDate" className="font-bold">
              Event Date:
            </label>
            <input
              type="datetime-local"
              required
              id="eventDate"
              name="eventDate"
              className="bg-transparent border border-slate-700 w-full rounded-lg"
            />
          </div>
          <button
            disabled={isSubmitting}
            className="px-6 py-2 border border-slate-700 rounded-lg font-bold hover:bg-slate-600 text-xl text-slate-950 self-center"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </Form>
      </ReactModal>
    </div>
  );
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  await db.event.create({
    data: {
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      eventDate: new Date(formData.get("eventDate") as string),
    },
  });

  return redirect("/events");
};

ReactModal.setAppElement("body");

export default Events;
