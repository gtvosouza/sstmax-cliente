import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const CardInformation = ({ label, value }) => {
  return (
    <Grid item style={{ flex: '0 45%', marginTop: '15px' }}>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="h5" color="textSecondary">
        {value}
      </Typography>
    </Grid>
  );
};

CardInformation.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CardInformation.defaultProps = {
  value: '',
};

export default CardInformation;
