import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-8xl font-bold">
        A better way of <span className="italic">Eventing</span>
      </h1>
      <p className="text-3xl font-semibold">
        Try our early beta and never loose track of your notes again!
      </p>
      <Link
        className="px-6 py-2 border border-slate-700 rounded-lg font-bold hover:bg-slate-600"
        to={"/events"}
        prefetch="intent"
      >
        Try Now!
      </Link>
    </main>
  );
}
