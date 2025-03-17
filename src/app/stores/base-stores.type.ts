import type { ApiError, BasePagination } from "../fetch/types";

interface BaseStore {
  loading: boolean;
  error: ApiError | null;

  clearStore: VoidFunction;
  clearError?: VoidFunction;
}

interface BaseSingleStore<D> extends BaseStore {
  single: D | null;
  getSingle: (id?: string | number | null) => Promise<D | null>;

  refreshSingle?: () => void;
}

interface BaseListStore<R, F = unknown> extends BaseStore {
  list: R[];
  getList: (id?: string) => Promise<R[]>;

  filter?: Partial<F>;
  changeFilter?: (params: Partial<F>, fetchAfter?: boolean) => void;
}

interface BasePaginatedListStore<R, F = unknown> extends BaseStore {
  list: R[];
  getList: (id?: string) => Promise<R[]>;

  pagination: BasePagination;
  changePagination: (
    params: Partial<BasePagination>,
    fetchAfter?: boolean
  ) => void;

  filter?: Partial<F>;
  changeFilter?: (params: Partial<F>, fetchAfter?: boolean) => void;
}

interface BaseAddStore<D, R = boolean> extends BaseStore {
  add: (data: D) => Promise<R | null>;
}

interface BaseEditStore<D, R = boolean> extends Omit<BaseStore, "clearStore"> {
  edit: (id: string | number, data: D) => Promise<R>;
}

interface BaseAddItemStore<D, R = boolean> extends BaseStore {
  add: (itemId: string, data: D) => Promise<R | null>;
}

interface BaseSingleItemStore<D> extends BaseStore {
  single: D | null;
  getSingle: (
    id?: string | number | null,
    itemId?: string | null
  ) => Promise<D | null>;

  refreshSingle?: () => void;
}

interface BaseRemoveStore<R = boolean> extends Omit<BaseStore, "clearStore"> {
  remove: (id: string | number, force?: boolean) => Promise<R>;
}

interface BaseSelectStore<R, F = unknown> extends BaseStore {
  list: R[];
  getList: (filter?: F) => Promise<R[]>;
}

const defaultPaginatedListValues = {
  list: [],
  pagination: { page: 1, take: 10 },
  loading: false,
  error: null,
};

const defaultListValues = { list: [], loading: false, error: null };
const defaultSingleValues = { single: null, loading: false, error: null };
const defaultAddValues = { loading: false, error: null };
const defaultEditValues = { loading: false, error: null };
const defaultDeleteValues = { loading: false, error: null };

export {
  defaultPaginatedListValues,
  defaultListValues,
  defaultSingleValues,
  defaultAddValues,
  defaultEditValues,
  defaultDeleteValues,
};

export type {
  BaseStore,
  BaseListStore,
  BasePaginatedListStore,
  BaseAddStore,
  BaseRemoveStore,
  BaseSelectStore,
  BaseEditStore,
  BaseSingleStore,
  BaseAddItemStore,
  BaseSingleItemStore,
};
