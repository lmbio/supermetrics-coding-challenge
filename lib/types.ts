export type Post = {
  id: string;
  message: string;
  status: string;
  created_time: string;
};

export type Sender = {
  id: string;
  name: string;
  posts: Array<Post>;
};
