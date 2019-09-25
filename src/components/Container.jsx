import React, { useContext, useEffect, useState } from 'react';
// Components
import { StateContext } from 'components/context/index';
import { BlogContainer } from 'components/menu/BlogContainer.jsx';
import { LinkContainer } from 'components/menu/LinkContainer.jsx';
import { RngContainer } from 'components/menu/RngContainer.jsx';

export const Container = () => {
  const { state } = useContext(StateContext);
  const {viewLinks, viewRng} = state;
  const [content, setContent] = useState(<BlogContainer />);

  useEffect(() => {
    if (viewLinks) {
      setContent(<LinkContainer />);
    } else if (viewRng) {
      setContent(<RngContainer />);
    } else {
      setContent(<BlogContainer />);
    }
  }, [viewLinks, viewRng]);

  return <div id="optimization-container">{content}</div>;
};
