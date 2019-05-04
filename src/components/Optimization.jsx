import React, { useMemo } from "react";
import { Container } from "./menu/Container.jsx";
import { LinkList } from "./link/LinkList.jsx";
import { CreateLink } from "./link/CreateLink.jsx";

export const Optimization = () => {
  const Blog = useMemo(() => <Container />, [Container]);

  return (
    <div id="optimization-container">
      {Blog}
      <LinkList />
      <CreateLink />
    </div>
  );
};
