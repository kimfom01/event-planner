import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { LayoutComponent } from "@remix-run/react/dist/routeModules";
import { useRef } from "react";
import { RiMenuLine } from "@remixicon/react";

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

export const Layout: LayoutComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
};

export default function App() {
  return <Outlet />;
}

const Header = () => {
  const navRef = useRef<HTMLElement>(null);

  const toggleMobileNav = () => {
    if (navRef) {
      navRef.current?.classList.toggle("hidden");
    }
  };

  return (
    <header className="flex flex-col justify-between md:flex-row">
      <section
        id="desktop-nav"
        className="font-semibold dark:text-slate-400 flex justify-between w-full"
      >
        <h1 className="text-2xl font-bold">
          <NavLink prefetch="intent" to={`/`}>
            Event Planner
          </NavLink>
        </h1>
        <nav className="hidden md:flex flex-col md:items-center md:flex-row gap-4">
          <NavLink prefetch="intent" to={`/`} className="group">
            <span className="group-[.active]:underline">Home</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/events`} className="group">
            <span className="group-[.active]:underline">Events</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/calendar`} className="group">
            <span className="group-[.active]:underline">Calendar</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/my-events`} className="group">
            <span className="group-[.active]:underline">My Events</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/profile`} className="group">
            <span className="group-[.active]:underline">Profile</span>
          </NavLink>
          <button
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold"
            type="button"
          >
            Login
          </button>
        </nav>
        <button className="md:hidden" onClick={toggleMobileNav}>
          <RiMenuLine />
        </button>
      </section>
      <section
        id="mobile-nav"
        ref={navRef}
        onClick={toggleMobileNav}
        aria-hidden="true"
        className="hidden font-semibold dark:text-slate-400 text-3xl origin-top bg-slate-950 bg-opacity-95 absolute top-12 w-full"
      >
        <nav className="flex flex-col min-h-screen items-center w-full gap-8 py-4">
          <NavLink prefetch="intent" to={`/`} className="group w-full">
            <span className="group-[.active]:underline">Home</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/events`} className="group w-full">
            <span className="group-[.active]:underline">Events</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/calendar`} className="group w-full">
            <span className="group-[.active]:underline">Calendar</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/my-events`} className="group w-full">
            <span className="group-[.active]:underline">My Events</span>
          </NavLink>
          <NavLink prefetch="intent" to={`/profile`} className="group w-full">
            <span className="group-[.active]:underline">Profile</span>
          </NavLink>
          <button
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold w-full"
            type="button"
          >
            Login
          </button>
        </nav>
      </section>
    </header>
  );
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">An error occured!</h1>
      <p className="text-3xl text-center font-bold">
        {isRouteErrorResponse(error) && error.data}
      </p>
      <p className="text-3xl text-center font-bold">
        {error instanceof Error && error.message}
      </p>
      <div>
        <span>Back to</span>&nbsp;
        <Link className="underline" to={"/"}>
          safety
        </Link>
        <span>!</span>
      </div>
    </div>
  );
};
