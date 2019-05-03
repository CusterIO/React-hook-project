import React, { useMemo } from "react";
import { BlogContainer } from "./menu/BlogContainer.jsx";
import { LinkList } from "./link/LinkList.jsx";
import { CreateLink } from "./link/CreateLink.jsx";

export const Optimization = () => {
  const Blog = useMemo(() => <BlogContainer />, [BlogContainer]);

  return (
    <div id="optimization-container">
      {Blog}
      <LinkList />
      <CreateLink />
    </div>
  );
};
