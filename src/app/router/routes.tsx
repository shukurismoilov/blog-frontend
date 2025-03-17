import { RouteObject } from "react-router";
import { MainLayout } from "../layouts";
import { homeRoutes } from "../../home/pages";
import { postsRoutes } from "../../posts/pages";
import { aboutRoutes } from "../../about/pages";
import { ErrorPage, NotFoundPage } from "../pages";

const mainRoute: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [...homeRoutes, ...postsRoutes, ...aboutRoutes],

  errorElement: <ErrorPage />,
};

const notFoundRoute: RouteObject = {
  path: "*",
  element: <NotFoundPage />,
};

export { mainRoute, notFoundRoute };
