import { type LoaderFunction } from "react-router";
import { postsListStore } from "../../stores";

const postsLoader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  if (searchParams.size > 0) {
    const filter = Object.fromEntries(searchParams.entries());

    postsListStore.getState().changeFilter?.(filter, true); 
    return null;
  }

  postsListStore.getState().getList(); 
  return null;
};

export { postsLoader };

