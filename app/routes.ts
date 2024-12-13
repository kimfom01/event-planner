import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("auth", "./routes/auth/auth.tsx", [
    route("google", "./routes/auth/google.tsx", [
      route("callback", "./routes/auth/google_callback.tsx"),
    ]),
  ]),
  route("events", "./routes/events/events.tsx", [
    route("create", "./routes/events/create.tsx"),
    route(":eventId", "./routes/events/event.tsx"),
  ]),
  route("calendar", "routes/calendar/calendar.tsx"),
  route("my-events", "routes/my-events/my-events.tsx"),
  route("profile", "routes/profile/profile.tsx"),
] satisfies RouteConfig;
