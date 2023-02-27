import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Post = {
  post: PostProperties | null;
};

type UserActions = {
  setPost: (post: PostProperties) => void;
};

interface PostProperties {
  title: string | null;
  description: string | null;
  image?: string | null;
}

export const postStore = create(
  persist<Post & UserActions>(
    (set) => ({
      post: {
        title: null,
        description: null,
        image: null,
      },
      setPost: (post) => set((state) => ({ post: { ...state.post, ...post } })),
    }),
    {
      name: "post-sesion",
    }
  )
);
