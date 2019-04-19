import React, { useMemo } from "react";
import { BlogContainer } from "./menu/BlogContainer.jsx";

export const Optimization = () => {
  const Blog = useMemo(() => <BlogContainer />, [BlogContainer]);

  return (
    <div id="optimization-container">
      {Blog}
    </div>
  );
};
