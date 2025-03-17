import { FC } from "react";
import { RouterProvider } from "react-router";
import { getRouter } from "./router";

const App: FC = () => {
  return <RouterProvider router={getRouter()} />;
};

export { App };
