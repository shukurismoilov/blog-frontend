import type { RouteObject } from "react-router";

const aboutRoutes: RouteObject[] = [
  {
    path: "/about",
    loader: () => {
      window.scrollTo(0, 0);
      return null;
    },
    lazy: async () => {
      const { AboutPage } = await import("./About/about.page");
      return { Component: AboutPage };
    },
  },
];

export { aboutRoutes };
