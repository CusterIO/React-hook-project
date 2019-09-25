import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
// Components
import { Typography, Button, TextField, Grid } from '@material-ui/core';
// Constants
import { DEFAULT_LANG_FILE } from 'components/context/constants';
// CSS
import 'components/rng/Rng.css';

export const Rng = () => {
  const { t } = useTranslation(DEFAULT_LANG_FILE);
  // Local state
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(6);
  const [rngValue, setRngValue] = useState(null);

  const generate = useCallback((min, max) => {
    try {
      if (!min || !max) {
        throw new Error('Argument exception: No empty argument allowed');
      }
      const faith = Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
      setRngValue(faith);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const setMin = useCallback((e) => {
    try {
      const {value} = e.target;
      if (value > maxValue) {
        throw new Error('Range exception: Min value cannot be larger than max value');
      }
  
      setMinValue(value);
    } catch (error) {
      console.error(error);
    }
  }, [maxValue]);

  const setMax = useCallback((e) => {
    try {
    const {value} = e.target;
    if (value < minValue) {
      throw new Error('Range exception: Min value cannot be larger than max value');
    }

    setMaxValue(value);
  } catch (error) {
    console.error(error.message);
  }
  }, [minValue]);

  return (
    <div className="rng-wrapper">
      <div className="rng-wrapper__typography">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              variant={'outlined'}
              label="Min"
              name="min"
              onChange={setMin}
              onBlur={setMin}
              value={minValue}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant={'outlined'}
              label="Max"
              name="max"
              onChange={setMax}
              onBlur={setMax}
              value={maxValue}
            />
          </Grid>
          {rngValue !== null && (
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" gutterBottom>
                {t('rng.rngValue', { value: rngValue })}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => generate(minValue, maxValue)}
          className="rng-button"
        >
          {t('button.showMe')}
        </Button>
      </div>
    </div>
  );
};
