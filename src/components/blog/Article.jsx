import React, { useContext, useEffect } from "react";
import { StateContext } from '../context/index';
import { Slider } from '../sliders/Slider.jsx';

export const Article = () => {
  const {state, dispatch } = useContext(StateContext);

  useEffect(() => {
    Validate(state.title);
  }, [state.title],
  );

  return (
    <div className='article-component-wrapper'>
      <input
        className='article-component-title'
        placeholder='Article title'
        type='text'
        value={state.title}
        onChange={(e) => {
          dispatch({type: 'setTitle', title: e.target.value})
        }
        }
      />
      <textarea
        className='article-component-desciption'
        placeholder='Article description'
        value={state.description}
        onChange={(e) => {
          dispatch({type: 'setDescription', description: e.target.value})
        }
        }
      />
      <input
        className='article-component-author'
        placeholder='Article author'
        type='text'
        value={state.author}
        onChange={(e) => {
          dispatch({type: 'setAuthor', author: e.target.value})
        }
        }
      />
      <button
        className='article-component-button'
        onClick = {() => {
          console.log('you clicked me');
        }
        }
      />
    </div>
  );
};

const Validate = (input) => {
  console.log(input);
};
