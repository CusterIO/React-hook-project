import React, { useContext } from "react";
import { StateContext } from "../context/index";
import {ArticleListView} from "../blog/ArticleListView";
import {Menu} from "./Menu";
import {Footer} from "./Footer";
import {ArticleView} from "../blog/ArticleView";
import { SubmitArticle } from '../blog/SubmitArticle';
import { styles } from "../style/Style";
import { Login } from "../authentication/Login";

export const BlogContainer = () => {
  const { state } = useContext(StateContext);
  let CurrentContent = <ArticleListView />;

  if (state.chosenArticle) {
    CurrentContent = <ArticleView />;
  }

  if (state.submitArticle || state.editArticle) {
    CurrentContent = <SubmitArticle />;
  }

  if (state.login || state.signup) {
    CurrentContent = <Login />;
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
            {CurrentContent}
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
