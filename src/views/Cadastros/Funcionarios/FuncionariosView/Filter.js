import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Grid,
    TextField,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';

const Search = ({ search, setSearch, resetSearch, setPage }) => {
  const handleChange = event => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value,
    });

    setPage(1);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <Typography variant="subtitle2" color="textPrimary">
          Filtros
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <TextField
              fullWidth
              value={search.cnpj}
              label="Nome"
              onChange={handleChange}
              variant="outlined"
              name="nome"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button variant="contained" onClick={() => resetSearch()}>
              LIMPAR
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

Search.propTypes = {
  search: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
  }),
  setSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

Search.defaultProps = {
  search: {
    name: ''
  },
};

export default Search;
