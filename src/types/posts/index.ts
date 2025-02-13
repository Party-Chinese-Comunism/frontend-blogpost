export type CreatePostInput = {
  title: string;
  description?: string;
  image?: FileList;
};

export type ListMyPostsResponse = {
  author: string;
  comments: [];
  description: string;
  id: number;
  image_url: string;
  title: string;
  user_id: number;
}[];
