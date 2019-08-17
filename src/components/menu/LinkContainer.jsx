import React, { useContext } from 'react';
// Components
import { StateContext } from '../context/index';
import { Menu } from './Menu';
import { Footer } from './Footer';
import { Login } from '../authentication/Login';
import { LinkList } from '../link/LinkList.jsx';
import { CreateLink } from '../link/CreateLink.jsx';
import { Profile } from '../account/Profile';
// CSS
import './LinkContainer.css';

export const LinkContainer = () => {
  const { state } = useContext(StateContext);
  let CurrentContent = <LinkList />;

  if (state.createLink) {
    CurrentContent = <CreateLink />;
  }

  if (state.login || state.signup) {
    CurrentContent = <Login />;
  }

  if (state.profile) {
    CurrentContent = <Profile />;
  }

  return (
    <React.Fragment>
      <div className="linkContainer-wrapper">
        <div className="linkContainer-wrapper__leftSide">
          <div className="linkContainer-wrapper__leftSide-style">Roger Hurtig</div>
        </div>
        <div className="linkContainer-wrapper__content">
          <Menu />
          <div className="linkContainer-wrapper__content-style">{CurrentContent}</div>
          <Footer />
        </div>
        <div className="linkContainer-wrapper__rightSide">
          <div className="linkContainer-wrapper__rightSide-style">Custer IO</div>
        </div>
      </div>
    </React.Fragment>
  );
};
