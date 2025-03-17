import { type LoaderFunction } from "react-router";
import { postsPaginatedListStore } from "../../stores";

const postsLoader: LoaderFunction = ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  if (searchParams.size > 0) {
    const filter = Object.fromEntries(searchParams.entries());

    postsPaginatedListStore.getState().changeFilter?.(filter, true);

    return null;
  }

  postsPaginatedListStore.getState().getList();
  return null;
};

export { postsLoader };
