import { Link } from "react-router";

export default function Index() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl md:text-8xl text-center md:text-left font-bold">
        A better way of <span className="italic">Eventing</span>
      </h1>
      <p className="text-xl text-center md:text-left text-slate-400 font-semibold">
        Try our early beta and never loose track of your events again!
      </p>
      <Link
        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold"
        to={"/events"}
        prefetch="intent"
      >
        Try Now!
      </Link>
    </main>
  );
}
