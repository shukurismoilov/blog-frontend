import type { RouteObject } from "react-router";

const homeRoutes: RouteObject[] = [
  {
    path: "/",
    loader: () => {
      window.scrollTo(0, 0);
      return null;
    },
    lazy: async () => {
      const { HomePage } = await import("./Home/home.page");
      return { Component: HomePage };
    },
  },
];

export { homeRoutes };
