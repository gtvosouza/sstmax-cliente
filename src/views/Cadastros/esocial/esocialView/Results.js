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



const Eventos = ({ evento }) => {
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
          <Typography variant="h5">{evento.EVENTO}</Typography>
        
        </Box>
        <Divider />
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <CardInformation label="Id Evento" value={evento.ID_EVENTO} />
            <CardInformation label="Funcionário" value={evento.NOME_FUNCIONARIO} />
            <CardInformation label="Data Documento" value={datetimeToString(evento.DATA_DOC)} />
            <CardInformation label="Protocolo" value={evento.PROTOCOLO} />
            <CardInformation label="Data Envio" value={datetimeToString(evento.DATA_DOC)} />
            <CardInformation label="Recibo" value={evento.RECIBO} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

Eventos.propTypes = {
  evento: PropTypes.shape({
    NOME_EMPRESA: PropTypes.string,
    NOME_FUNCIONARIO: PropTypes.string,
    DATA_DOC: PropTypes.string,
    DATA_ENVIO: PropTypes.string,
    PROTOCOLO: PropTypes.string,
    RECIBO: PropTypes.string,
    ID_EVENTO: PropTypes.string,
    EVENTO: PropTypes.string,
  }).isRequired,
};

export default Eventos;
