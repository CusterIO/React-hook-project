import React, { useContext } from "react";
import { StateContext } from "../context/index";
import {Menu} from "./Menu";
import {Footer} from "./Footer";
import { styles } from "../style/Style";
import { Login } from "../authentication/Login";
import { Profile } from "../account/Profile";
import {BlogList} from "../blog/BlogList";
import {Blog} from "../blog/Blog";
import {CreateBlogPost} from "../blog/CreateBlogPost";
// import {ArticleView} from "../frontendOnlyBlog/ArticleView";
// import { SubmitArticle } from '../frontendOnlyBlog/SubmitArticle';
// import {ArticleListView} from "../frontendOnlyBlog/ArticleListView";

export const BlogContainer = () => {
  const { state } = useContext(StateContext);
  let CurrentContent = <BlogList />;

  if (state.chosenArticle) {
    CurrentContent = <Blog />;
  }

  if (state.submitArticle || state.editArticle) {
    CurrentContent = <CreateBlogPost />;
  }

  if (state.login || state.signup) {
    CurrentContent = <Login />;
  }

  if (state.profile) {
    CurrentContent = <Profile />;
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
