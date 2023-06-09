import PostCard from "@/components/home/PostCard";
import React from "react";
import { PostCardData } from "types";

type PostListProps = {
  posts: PostCardData[];
};

const PostsList = ({ posts }: PostListProps) => {
  return (
    <article aria-label="Lista de posts do blog." data-testid='post-list'>
      <div
        className="grid grid-cols-1 gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12"
        role="list"
      >
        {posts.map(({ coverImage = null, title, tags, excerpt, slug, free }) => (
          <PostCard
            data={{ coverImage, title, tags, excerpt, slug, free }}
            key={`post-item-${slug}`}
          />
        ))}
      </div>
    </article>
  );
};

export default PostsList;
