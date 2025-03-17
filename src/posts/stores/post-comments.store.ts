import { create } from "zustand";
import { BaseListStore, defaultListValues } from "../../app/stores";
import { PostCommentDto } from "../types";
import { apiGetService } from "../../app/fetch/services";

const postsCommentsStore = create<BaseListStore<PostCommentDto>>((set) => ({
  ...defaultListValues,

  getList: async (id?: number) => {
    set({ error: null, loading: true });

    const { result, error } = await apiGetService<PostCommentDto[]>(
      `/posts/${id}/comments`
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
      });
      return result;
    }
    return [];
  },

  clearStore: () => {
    set({ ...defaultListValues });
  },
}));

export { postsCommentsStore };
