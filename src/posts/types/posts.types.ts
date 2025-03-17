interface PostsListDto {
  id: number;
  userId: number;
  title: string;
  body: string;
}

type SinglePostDto = PostsListDto;

interface PostCommentDto {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostsFilterDto {
  title?: string;
  userId?: number;
}

export type { PostsListDto, PostsFilterDto, SinglePostDto, PostCommentDto };
