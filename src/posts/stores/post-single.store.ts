import { create } from "zustand";
import { BaseSingleStore, defaultSingleValues } from "../../app/stores";
import { SinglePostDto } from "../types";
import { apiGetService } from "../../app/fetch/services";

const postSingleStore = create<BaseSingleStore<SinglePostDto>>((set) => ({
  ...defaultSingleValues,

  getSingle: async (id) => {
    set({ error: null, loading: true });

    const { result, error } = await apiGetService<SinglePostDto>(
      `/posts/${id}`
    );

    if (error) {
      set({
        ...defaultSingleValues,
        error,
      });

      return null;
    } else if (result) {
      set({
        ...defaultSingleValues,
        single: result,
      });

      return result;
    }
    return null;
  },

  clearStore: () => {
    set({ ...defaultSingleValues });
  },
}));

export { postSingleStore };
