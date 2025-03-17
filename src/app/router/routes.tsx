import { RouteObject } from "react-router";
import { MainLayout } from "../layouts";
import { homeRoutes } from "../../home/pages";

const mainRoute: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [...homeRoutes],

  errorElement: <>Error Page</>,
};

const notFoundRoute: RouteObject = {
  path: "*",
  element: <>Not Found Page</>,
};

export { mainRoute, notFoundRoute };
