import React, { useContext } from "react";
import { StateContext } from "../context/index";
import {ArticleListView} from "../blog/ArticleListView";
import {Menu} from "./Menu";
import {Footer} from "./Footer";
import {ArticleView} from "../blog/ArticleView";
import { SubmitArticle } from '../blog/SubmitArticle';
import { styles } from "../style/Style";

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
      <div style={styles.appWrapper}>
        <div style={styles.leftSideContainer}>
          <div style={styles.verticalTextLeft}>
            Roger Hurtig
          </div>
        </div>
        <div style={styles.applicationContainer}>
          <Menu />
          <div style={styles.articleContentContainer}>
            {CurrentArticleContent}
          </div>
          <Footer />
        </div>
        <div style={styles.rightSideContainer}>
          <div style={styles.verticalTextRight}>
            Custer IO
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
