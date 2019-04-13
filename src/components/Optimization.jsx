import React, { useMemo } from 'react';
import { IntroContainer } from "./intro/IntroContainer.jsx";

import "./Optimization.css";

export const Optimization = () => {
  const Intro = useMemo(() => <IntroContainer />, [IntroContainer]);

  return (
    <div id='optimization-container'>
      {Intro}
    </div>
  )
}
