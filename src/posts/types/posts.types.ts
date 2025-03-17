interface PostsListDto {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostsFilterDto {
  title?: string;
  userId?: number;
}

export type { PostsListDto, PostsFilterDto };
