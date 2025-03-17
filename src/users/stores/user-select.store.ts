import { create } from "zustand";
import { BaseListStore, defaultListValues } from "../../app/stores";
import { BaseEntity } from "../../app/types";
import { apiGetService } from "../../app/fetch/services";

const userSelectStore = create<BaseListStore<BaseEntity>>((set) => ({
  ...defaultListValues,

  getList: async () => {
    set({ error: null, loading: true });

    const { result, error } = await apiGetService<BaseEntity[]>(`/users`);

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

export { userSelectStore };
