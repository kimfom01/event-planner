import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { db } from "~/utils/db.server";
import { Event } from "~/models/Event";
import { ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";

type FormType = "UPDATE" | "DELETE";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { eventId } = params;

  const event: Event | null = await db.event.findFirst({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw Response.json("Event with provided id could not be found!", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return Response.json(event);
};

const Events = () => {
  const event = useLoaderData<Event>();

  return (
    <div className="md:mt-16 p-8 border border-slate-800 rounded-lg flex flex-col gap-4">
      <Form method="POST" key={event.id} className="flex flex-col gap-4">
        <input type="hidden" name="eventId" value={event?.id} readOnly />
        <div className="text-xl font-bold self-center">New Event</div>
        <div className="flex flex-col items-start gap-4 w-full">
          <label htmlFor="title" className="font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            required
            name="title"
            defaultValue={event?.title}
            className="bg-transparent border border-slate-700 w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col items-start gap-4 w-full">
          <label htmlFor="description" className="font-bold">
            Description:
          </label>
          <textarea
            id="description"
            required
            rows={3}
            name="description"
            defaultValue={event?.description}
            className="bg-transparent border border-slate-700 w-full rounded-lg"
          ></textarea>
        </div>
        <div className="flex flex-col items-start gap-4 w-full">
          <label htmlFor="location" className="font-bold">
            Location:
          </label>
          <input
            type="text"
            required
            id="location"
            name="location"
            defaultValue={event?.location}
            className="bg-transparent border border-slate-700 w-full rounded-lg"
          />
        </div>
        <div className="">
          <div className="flex gap-4">
            <div className="font-bold">Date:</div>
            <div>{new Date(event.eventDate).toDateString()}</div>
          </div>
          <div className="flex gap-4">
            <div className="font-bold">Time:</div>
            <div>{new Date(event.eventDate).toTimeString()}</div>
          </div>
          <div className="text-xs text-slate-500 font-bold italic">
            Date and Time are fixed
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-600 text-xl"
            name="intent"
            value={"UPDATE"}
          >
            Update
          </button>
          <button
            className="px-6 py-2 border border-slate-700 rounded-lg font-bold hover:bg-slate-600 text-xl"
            name="intent"
            value={"DELETE"}
          >
            Delete
          </button>
        </div>
      </Form>
    </div>
  );
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const formType: FormType = formData.get("intent") as FormType;

  switch (formType) {
    case "DELETE":
      await deleteEvent(formData);
      return redirect("/events");
    case "UPDATE": {
      const eventId = await updateEvent(formData);
      return redirect(`/events/${eventId}`);
    }
  }
};

export default Events;

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="md:mt-16 p-8 border border-slate-700 rounded-lg">
        <div className="text-red-600 font-bold">
          Something went wrong: {error.status} {error.statusText}
        </div>
        <div className="text-2xl">{error.data}</div>
      </div>
    );
  }

  return (
    <div>
      <div>Something went wrong!</div>
      <div>{error instanceof Error && error.message}</div>
    </div>
  );
};

const deleteEvent = async (formData: FormData) => {
  const eventId = formData.get("eventId") as string;
  await db.event.delete({
    where: {
      id: eventId,
    },
  });
};

const updateEvent = async (formData: FormData) => {
  const eventId = formData.get("eventId") as string;

  await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
    },
  });
  return eventId;
};
