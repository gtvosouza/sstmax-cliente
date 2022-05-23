import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import EsocialService from '../../../../services/esocialService'
import Filters from './Filter';
import Loading from 'src/components/Loading';
import paginate from 'src/utils/paginate';
import Results from './Results';
import Pagination from '@material-ui/lab/Pagination';
import esocialService from '../../../../services/esocialService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function FuncionarioView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [eventos, setEventos] = useState([]);
  
  const searchDefaultValues = {
    name: ''  
  };

  const [search, setSearch] = useState(searchDefaultValues);
  
  const resetSearch = () => {
    setSearch(searchDefaultValues);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState({});
  const perPage = 12;

  const getEventos = useCallback(() => {
    EsocialService.get.then((response) => {
      if (isMountedRef.current) {
        setEventos(response);
      }
    });    

  }, [isMountedRef]);
  
  useEffect(() => {
    getEventos();
  }, []);
  
  const executeFilter = () => {

    return eventos.filter(f => {
      let found = false;

      if (!found && search.name && f.NOME_FUNCIONARIO !== undefined) {
        found = !f.NOME_FUNCIONARIO.toLowerCase().includes(search.name.toLowerCase());
      }
      
      

      return !found; 
    });
  };

  useEffect(() => {    
    if (eventos != undefined) {
      setFiltered(executeFilter);      
      setIsLoading(false);
    } 
  }, [eventos, search]);
  

  return (
    <Page className={classes.root} title="Funcionários">
      <Container className={classes.root} maxWidth={false}>
        <Header />
      
          <>
            <Grid container spacing={1} className={classes.page}>
              <Grid item lg={12} sm={12} xs={12}>
                <Filters
                  search={search}
                  setSearch={setSearch}
                  resetSearch={resetSearch} 
                  setPage={setPage}
                />
              </Grid>
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
              <Box mt={3}>
                {isLoading ? (
                  <Loading message="Buscando eventos..." />
                ) : (
                  <Grid container spacing={2}>
                    {filtered.length ? (
                      <>
                        {paginate(filtered, perPage, page).map(
                          (evento, index) => (
                            <Results
                              key={evento.RECIBO}
                              eventos={eventos}
                            />
                          )
                        )}
                        <Box
                          pt={3}
                          display="flex"
                          justifyContent="center"
                          width="100%"
                        >
                          <Pagination
                            count={Math.ceil(filtered.length / perPage)}
                            page={page}
                            onChange={(_object, newPage) => {
                              setPage(newPage);
                            }}
                          />
                        </Box>
                      </>
                    ) : (
                      <Grid
                        container
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography variant="h5">
                            Nenhum Funcionário Encontrado
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Box>
            </Grid>
          </>
       
      </Container>
    </Page>
  );
}

export default FuncionarioView;
