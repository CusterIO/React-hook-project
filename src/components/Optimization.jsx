import React, { useMemo } from "react";
import { IntroContainer } from "./intro/IntroContainer.jsx";
import { BlogContainer } from "./menu/BlogContainer.jsx";

export const Optimization = () => {
  const Intro = useMemo(() => <IntroContainer />, [IntroContainer]);
  const Blog = useMemo(() => <BlogContainer />, [BlogContainer]);

  return (
    <div id="optimization-container">
      {Blog}
      {Intro}
    </div>
  );
};
