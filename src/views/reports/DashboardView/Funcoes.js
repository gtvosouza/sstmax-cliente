import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Avatar,
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

function SystemHealth({ qtdeFuncoes, className, ...rest }) {
  const classes = useStyles();
  const data = {
    value: qtdeFuncoes
  };

  return (
    <Card
    className={clsx(classes.root, className)}
    {...rest}
  >
    <Box flexGrow={1}>
      <Typography
        component="h3"
        gutterBottom
        variant="overline"
        color="textSecondary"
      >
        Funções
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {data.value}
        </Typography>         
      </Box>
    </Box>
    <Avatar className={classes.avatar}>
    
    </Avatar>
  </Card>
  );
}

SystemHealth.propTypes = {
  className: PropTypes.string
};

export default SystemHealth;
