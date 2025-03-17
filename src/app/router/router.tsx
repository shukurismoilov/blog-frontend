import { createBrowserRouter } from "react-router";
import { mainRoute, notFoundRoute } from "./routes";

function getRouter() {
  const router = createBrowserRouter([mainRoute, notFoundRoute]);
  return router;
}

export { getRouter };
