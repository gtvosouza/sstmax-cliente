import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  Box,
  Divider,
  CardContent,
  Typography,
  ListItemIcon,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import CardInformation from 'src/components/CardInformation';
import VisibilityIcon from '@material-ui/icons/Visibility';
import datetimeToString from 'src/utils/datetimeToString';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListAltIcon from '@material-ui/icons/ListAlt';
import authService from 'src/services/authService';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';

const Company = ({ funcionario }) => {
  const [anchor, setAnchor] = useState(null);
  const account = useSelector(state => state.account);
  const history = useHistory();

  const handleClick = event => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const setSession = (company, id) => {
    sessionStorage.setItem('company', company);
    sessionStorage.setItem('idCompany', id);
  };

  return (
    <Grid item xs={12} sm={12} md={3} lg={3}>
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
            onClick={handleClick}
          >
            <MoreVertIcon />
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
            <CardInformation label="Função" value={datetimeToString(funcionario.NOME_FUNCAO)} />
            <CardInformation label="Matricula e-Social" value={datetimeToString(funcionario.MATRICULA_ESOCIAL)} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

Company.propTypes = {
  setSelected: PropTypes.func.isRequired,
  setInQuery: PropTypes.func.isRequired,
  company: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cnpj: PropTypes.string,
    erp: PropTypes.string,
  }).isRequired,
};

export default Company;
