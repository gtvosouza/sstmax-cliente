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


const Agendamento = ({ horario }) => {
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
          <Typography variant="h5">{horario.NOME_FUNCIONARIO}</Typography>         

        </Box>
        <Divider />
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <CardInformation label="Função" value={horario.NOME_FUNCAO} />
            <CardInformation label="Data" value={datetimeToString(horario.DATA_AGENDA)} />
            <CardInformation label="Hora" value={horario.HORA_AGENDA} />
            <CardInformation label="Tipo de Exame" value={horario.TIPO_EXAME} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

Agendamento.propTypes = {
  evento: PropTypes.shape({
    ID_AGENDA_FONE: PropTypes.number,
    NOME_FUNCIONARIO: PropTypes.string,
    DATA_AGENDA: PropTypes.string,
    DATA_ENVIO: PropTypes.string,
    HORA_AGENDA: PropTypes.string,
    TIPO_EXAME: PropTypes.string,
  }).isRequired,
};

export default Agendamento;
