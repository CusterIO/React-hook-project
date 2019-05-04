import React, { useContext } from "react";
import { StateContext } from "../context/index";
import { BlogContainer } from "./menu/BlogContainer.jsx";
import { LinkContainer } from "./menu/LinkContainer.jsx";

export const Container = () => {
  const { state } = useContext(StateContext);
  let CurrentContainer = <BlogContainer />;

  if (state.viewLinks) {
    CurrentContainer = <LinkContainer />;
  }

  return (
    <div id="optimization-container">
      {CurrentContainer}
    </div>
  );
};
