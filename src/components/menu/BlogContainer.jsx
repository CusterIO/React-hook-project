import React, { useContext } from 'react';
// Components
import { StateContext } from '../context/index';
import { Menu } from './Menu';
import { Footer } from './Footer';
import { Login } from '../authentication/Login';
import { Profile } from '../account/Profile';
import { BlogList } from '../blog/BlogList';
import { Blog } from '../blog/Blog';
import { CreateBlogPost } from '../blog/CreateBlogPost';
// CSS
import './BlogContainer.css';

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
      <div className="blogContainer-wrapper">
        <div className="blogContainer-wrapper__leftSide">
          <div className="blogContainer-wrapper__leftSide-style">Roger Hurtig</div>
        </div>
        <div className="blogContainer-wrapper__content">
          <Menu />
          <div className="blogContainer-wrapper__content-style">{CurrentContent}</div>
          <Footer />
        </div>
        <div className="blogContainer-wrapper__rightSide">
          <div className="blogContainer-wrapper__rightSide-style">Custer IO</div>
        </div>
      </div>
    </React.Fragment>
  );
};
