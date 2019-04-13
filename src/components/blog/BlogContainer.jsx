import React, { useContext, useEffect } from "react";
import { StateContext } from '../context/index';
import { Article } from './Article.jsx';

export const BlogContainer = () => {
  const {state, dispatch } = useContext(StateContext);

  return (
    <div className='blog-component-wrapper'>
      <Article />
    </div>
  );
};
