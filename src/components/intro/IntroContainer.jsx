import React, { useContext } from "react";
import { StateContext } from '../context/index';

export const IntroContainer = () => {
  const {state, dispatch } = useContext(StateContext);

  return (
    <div className='intro-component-wrapper'>
      {state.count}
    </div>
  );
};
