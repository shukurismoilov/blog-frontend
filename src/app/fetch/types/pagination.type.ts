interface BasePagination {
  page: number;
  take: number;
  readonly total?: number
}

interface PaginatedData<T> {
  page: number;
  take: number;
  total: number;
  items: Array<T>;
}

export type { BasePagination, PaginatedData };
