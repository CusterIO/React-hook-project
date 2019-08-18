import React, { useContext } from 'react';
// Components
import { StateContext } from 'components/context/index';
import { BlogContainer } from 'components/menu/BlogContainer.jsx';
import { LinkContainer } from 'components/menu/LinkContainer.jsx';

export const Container = () => {
  const { state } = useContext(StateContext);
  let CurrentContainer = <BlogContainer />;

  if (state.viewLinks) {
    CurrentContainer = <LinkContainer />;
  }

  return <div id="optimization-container">{CurrentContainer}</div>;
};
