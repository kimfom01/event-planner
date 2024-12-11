import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useNavigation } from "@remix-run/react";
import { db } from "~/utils/db.server";

const CreateEvents = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="POST"
      className="w-full h-full flex flex-col gap-4 md:mt-16 p-8 border border-slate-800 rounded-lg"
      reloadDocument
    >
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
          className="bg-transparent border border-slate-700 w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
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
        className="px-6 py-2 border border-slate-700 rounded-lg font-bold bg-slate-700 hover:bg-slate-600 text-xl w-full self-center"
      >
        {isSubmitting ? "Creating..." : "Create"}
      </button>
    </Form>
  );
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  await db.event.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      eventDate: new Date(formData.get("eventDate") as string),
    },
  });

  return redirect("/events");
};

export default CreateEvents;
