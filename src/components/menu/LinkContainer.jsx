import React, { useContext } from "react";
import { StateContext } from "../context/index";
import {Menu} from "./Menu";
import {Footer} from "./Footer";
import { styles } from "../style/Style";
import { Login } from "../authentication/Login";
import { LinkList } from "../link/LinkList.jsx";
import { CreateLink } from "../link/CreateLink.jsx";

export const LinkContainer = () => {
  const { state, dispatch } = useContext(StateContext);
  let CurrentContent = <LinkList />;

  if (state.createLink) {
    CurrentContent = <CreateLink />;
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
