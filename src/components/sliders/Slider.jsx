import React, { useContext } from 'react';
import { StateContext } from '../context/index';

import './Slider.css';

export const Slider = () => {
  const { state, dispatch } = useContext(StateContext);

  return (
    <div className="slider-component-container">
      {state.slider}
      <input
        className="range-slider-component"
        type="range"
        min={-90}
        max={90}
        step={1}
        value={state.slider}
        onChange={e => {
          dispatch({ type: 'setSlider', slider: e.target.value });
        }}
      />
    </div>
  );
};
