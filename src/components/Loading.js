import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';

const Loading = ({ message }) => (
  <Box
    mt={3}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <CircularProgress />
    <Box mt={3}>
      <Typography variant="h5">{message || 'Carregando...'}</Typography>
    </Box>
  </Box>
);

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: '',
};

export default Loading;
