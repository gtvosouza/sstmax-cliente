import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {
  Grid,
  Card,
  Box,
  Divider,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import CardInformation from 'src/components/CardInformation';
import datetimeToString from 'src/utils/datetimeToString';
import EditIcon from '@material-ui/icons/Edit';


const Funcionarios = ({ funcionario }) => {
  const history = useHistory();

  const routeChange = id => {
    let path =`/app/cadastros/funcionarios/edit/${id}`;
    history.push(path);
  };

  const handleClick = (event) => {
    routeChange()
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Card>
        <Box
          display="flex"
          alignContent="center"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h5">{funcionario.NOME_FUNCIONARIO}</Typography>
          <IconButton
            aria-label="options"
            aria-controls="options-menu"
            aria-haspopup="true"
            onClick={() => { routeChange(funcionario.ID_FUNCIONARIO) }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Divider />
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <CardInformation label="Id Funcionário" value={funcionario.ID_FUNCIONARIO} />
            <CardInformation label="Nascimento" value={datetimeToString(funcionario.DATA_NASC)} />
            <CardInformation label="Adimissão" value={datetimeToString(funcionario.DATA_ADMISSAO)} />
            <CardInformation label="Função" value={funcionario.NOME_FUNCAO} />
            <CardInformation label="Matricula e-Social" value={funcionario.MATRICULA_ESOCIAL} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

Funcionarios.propTypes = {
  funcionario: PropTypes.shape({
    ID_FUNCIONARIO: PropTypes.number,
    DATA_NASC: PropTypes.string,
    DATA_ADMISSAO: PropTypes.string,
    NOME_FUNCAO: PropTypes.string,
    MATRICULA_ESOCIAL: PropTypes.string,
  }).isRequired,
};

export default Funcionarios;
