import React, { useMemo } from 'react';
import { IntroContainer } from "./intro/IntroContainer.jsx";

export const Collecter = () => {
  const Intro = useMemo(() => <IntroContainer />, [IntroContainer]);

  return (
    <>
      {Intro}
    </>
  )
}
