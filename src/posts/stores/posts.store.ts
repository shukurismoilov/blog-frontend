import { create } from "zustand";
import { BaseListStore, defaultListValues } from "../../app/stores";
import { PostsFilterDto, PostsListDto } from "../types";
import { apiGetService } from "../../app/fetch/services";
import { removeUselessQueryItems } from "../../app/helpers";

const postsPaginatedListStore = create<
  BaseListStore<PostsListDto, PostsFilterDto>
>((set, get) => ({
  ...defaultListValues,

  filter: {},
  changeFilter: (newFilter, fetchAfter) => {
    const oldFilter = get().filter;
    set({ filter: { ...oldFilter, ...newFilter } });

    // set({ pagination: { page: 1, take: 10 } });

    if (fetchAfter) {
      get().getList();
    }
  },

  getList: async () => {
    set({ error: null, loading: true });

    const filter = get().filter;
    // const pagination = get().pagination;

    const queryParams = new URLSearchParams(
      removeUselessQueryItems({
        ...filter,
        // _page: pagination.page,
        // _limit: pagination.take,
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
      set({
        ...defaultListValues,
        list: result,
        // it does not totalAmount parmeter so pagination will be useless
        // pagination: pagination,
      });

      return result;
    }
    return [];
  },

  // pagination: { page: 1, take: 10 },
  // changePagination: (newPagination, fetchAfter) => {
  //   const oldPagination = get().pagination;
  //   if (newPagination.take) {
  //     set({
  //       pagination: {
  //         ...oldPagination,
  //         take: newPagination.take,
  //         page: 1,
  //       },
  //     });
  //   } else {
  //     set({ pagination: { ...oldPagination, ...newPagination } });
  //   }

  //   if (fetchAfter) {
  //     get().getList();
  //   }
  // },

  clearStore: () => {
    set({ ...defaultListValues });
  },
}));

export { postsPaginatedListStore };
