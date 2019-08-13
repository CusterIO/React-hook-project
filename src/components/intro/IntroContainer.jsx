import React, { useContext, useEffect } from 'react';
import { StateContext } from '../context/index';
import { Slider } from '../sliders/Slider.jsx';

export const IntroContainer = () => {
  const { state } = useContext(StateContext);
  const x = 100;
  const y = 100;
  let styles = {
    transform: `translate(${x}px, ${y}px) rotate(${state.slider}deg)`
  };

  useEffect(() => {
    styles = {
      transform: `translate(${x}px, ${y}px) rotate(${state.slider}deg)`
    };
  }, [state.slider]);

  return (
    <div className="intro-component-wrapper">
      <div className="intro-component-wrapper-rotation-outer">
        <div className="intro-component-wrapper-rotation-inner" style={styles}>
          Rotate me
        </div>
      </div>
      <Slider />
    </div>
  );
};
