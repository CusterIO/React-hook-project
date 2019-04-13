import React, { useMemo } from "react";
import { IntroContainer } from "./intro/IntroContainer.jsx";
import { MenuContainer } from "./menu/MenuContainer.jsx";

export const Optimization = () => {
  const Intro = useMemo(() => <IntroContainer />, [IntroContainer]);
  const Menu = useMemo(() => <MenuContainer />, [MenuContainer]);

  return (
    <div id="optimization-container">
      {Menu}
      {Intro}
    </div>
  );
};
