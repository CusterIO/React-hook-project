import React, { useContext } from "react";
import { StateContext } from "../context/index";
import {ArticleListView} from "../blog/ArticleListView";
import {Menu} from "./Menu";
import {ArticleView} from "../blog/ArticleView";
import { SubmitArticle } from '../blog/SubmitArticle';

export const BlogContainer = () => {
  const { state, dispatch } = useContext(StateContext);
  let CurrentArticleContent = <ArticleListView />;

  if (state.chosenArticle) {
    CurrentArticleContent = <ArticleView />;
  }

  if (state.submitArticle) {
    CurrentArticleContent = <SubmitArticle />;
  }

  return (
    <React.Fragment>
      <Menu />
      {CurrentArticleContent}
    </React.Fragment>
  );
}
