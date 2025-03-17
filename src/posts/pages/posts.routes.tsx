import type { RouteObject } from "react-router";

import { postsLoader } from "./Posts";
import { postsCommentsStore, postSingleStore } from "../stores";
import { userSelectStore } from "../../users/stores";

const postsRoutes: RouteObject[] = [
  {
    path: "/posts",
    lazy: async () => {
      const { PostsPage } = await import("./Posts");
      return { Component: PostsPage, loader: postsLoader };
    },
  },
  {
    path: "/posts/:id",
    lazy: async () => {
      const { SinglePostPage } = await import("./SinglePost");
      return {
        Component: SinglePostPage,
        loader: ({ params }) => {
          postSingleStore.getState().getSingle(params.id);
          postsCommentsStore.getState().getList(Number(params.id));
          userSelectStore.getState().getList();

          return null;
        },
      };
    },
  },
];

export { postsRoutes };
