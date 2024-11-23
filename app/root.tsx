import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Event Planner" },
    {
      name: "description",
      content:
        "The Event Planner App is a web-based application designed to allow users to create, manage, and participate in events. The app provides tools for scheduling, event tracking, RSVP functionality, and event visualization through a calendar view.",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="container mx-auto p-4 md:px-0 h-screen w-screen">
        <Header />
        <div className="py-4 w-full h-full">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

const Header = () => {
  return (
    <header className="flex flex-col justify-between md:flex-row">
      <h1 className="text-2xl font-bold">
        <NavLink prefetch="intent" to={`/`}>
          Event Planner
        </NavLink>
      </h1>
      <div className="hidden md:block font-semibold dark:text-slate-400">
        <nav className="flex flex-col md:items-center md:flex-row gap-4">
          <NavLink prefetch="intent" to={`/`}>
            Home
          </NavLink>
          <NavLink prefetch="intent" to={`/events`}>
            Events
          </NavLink>
          <NavLink prefetch="intent" to={`/calendar`}>
            Calendar
          </NavLink>
          <NavLink prefetch="intent" to={`/my-events`}>
            My Events
          </NavLink>
          <NavLink prefetch="intent" to={`/profile`}>
            Profile
          </NavLink>
          <button
            className="px-6 py-2 border border-slate-700 rounded-lg font-bold hover:bg-slate-600"
            type="button"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};
