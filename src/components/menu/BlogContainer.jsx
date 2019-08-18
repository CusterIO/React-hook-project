import React, { useContext } from 'react';
// Components
import { StateContext } from 'components/context/index';
import { Menu } from 'components/menu/Menu';
import { Footer } from 'components/menu/Footer';
import { Login } from 'components/authentication/Login';
import { Profile } from 'components/account/Profile';
import { BlogList } from 'components/blog/BlogList';
import { Blog } from 'components/blog/Blog';
import { CreateBlogPost } from 'components/blog/CreateBlogPost';
// CSS
import 'components/menu/BlogContainer.css';
/* {t('blogcontainer.insertValue', {value: *input value*})} */

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
