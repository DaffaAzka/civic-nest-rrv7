import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_guest/layout.tsx", [
    index("routes/_guest/home.tsx"),
    route("/register", "routes/_guest/register.tsx"),
    route("/sign-in", "routes/_guest/sign-in.tsx"),
  ]),

  layout("routes/_auth/layout.tsx", [
    route("/dashboard", "routes/_auth/dashboard.tsx"),
    route("/residents", "routes/_auth/residents/index.tsx"),
    route("/residents/:id", "routes/_auth/residents/$id.tsx"),
    route("/master", "routes/_auth/master/index.tsx"),
    route("/master/rw", "routes/_auth/master/rw/index.tsx"),
    route("/master/province", "routes/_auth/master/province/index.tsx"),
  ]),
] satisfies RouteConfig;
