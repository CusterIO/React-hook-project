import React from 'react';
// Components
import Loader from 'react-loader-spinner';
// CSS
import { styles } from '../style/Style';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Spinner = () => {
  return (
    <div style={styles.spinner}>
      <Loader type="Bars" color="#3f51b5" height={100} width={100} />
    </div>
  );
};
