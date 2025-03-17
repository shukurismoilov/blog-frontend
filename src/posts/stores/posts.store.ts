import { create } from "zustand";
import { BaseListStore, defaultListValues } from "../../app/stores";
import { PostsFilterDto, PostsListDto } from "../types";
import { apiGetService } from "../../app/fetch/services";
import { removeUselessQueryItems } from "../../app/helpers";

const postsListStore = create<BaseListStore<PostsListDto, PostsFilterDto>>(
  (set, get) => ({
    ...defaultListValues,

    filter: {},
    changeFilter: (newFilter, fetchAfter) => {
      const oldFilter = get().filter;
      set({ filter: { ...oldFilter, ...newFilter } });

      if (fetchAfter) {
        get().getList();
      }
    },

    getList: async () => {
      set({ error: null, loading: true });
      const filter = get().filter;

      const queryParams = new URLSearchParams(
        removeUselessQueryItems({
          userId: filter?.userId,
        })
      );

      const { result, error } = await apiGetService<PostsListDto[]>(
        `/posts?${queryParams.toString()}`
      );

      if (error) {
        set({
          ...defaultListValues,
          error,
        });

        return [];
      } else if (result) {
        const filterByTitleApplied = get().filter?.title;
        set({
          ...defaultListValues,
          list: filterByTitleApplied
            ? result.filter((post) =>
                post.title
                  .toLowerCase()
                  .includes(filterByTitleApplied.toLowerCase())
              )
            : result,
        });
        return result;
      }
      return [];
    },

    clearStore: () => {
      set({ ...defaultListValues });
    },
  })
);

export { postsListStore };
