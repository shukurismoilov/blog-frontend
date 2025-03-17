import type { RouteObject } from "react-router";

import { postsLoader } from "./Posts";
import { SinglePostPage } from "./SinglePost";

const postsRoutes: RouteObject[] = [
  {
    path: "/posts",
    lazy: async () => {
      const { PostsPage } = await import("./Posts/posts.page");
      return { Component: PostsPage, loader: postsLoader };
    },
  },
  {
    path: "/posts/:id",
    element: <SinglePostPage />,
  },
];

export { postsRoutes };
