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
import Filters from './Filter';
import Loading from 'src/components/Loading';
import paginate from 'src/utils/paginate';
import Results from './Results';
import Pagination from '@material-ui/lab/Pagination';
import AgendaService from '../../../../services/agendaService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AgendaView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [horarios, setHorarios] = useState([]);
  
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

 const getHorarios = useCallback(() => {
    AgendaService.get().then((response) => {
      if (isMountedRef.current) {
        setHorarios(response);
      }
    });    

  }, [isMountedRef]);
  
  
  useEffect(() => {    
    getHorarios()
  }, []);
  

  const executeFilter = () => {

    return horarios.filter(f => {
      let found = false;

    /*  if (!found && search.name && f.NOME_FUNCIONARIO !== undefined) {
        found = !f.NOME_FUNCIONARIO.toLowerCase().includes(search.name.toLowerCase());
      }
      */
      

      return !found; 
    });
  };

  useEffect(() => {    
    if (horarios != undefined) {
      setFiltered(executeFilter);      
      setIsLoading(false);
    } 
  }, [horarios, search]);
  

  return ( 
    <Page className={classes.root} title="Agendamento">
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
                  <Loading message="Buscando horários..." />
                ) : (
                  <Grid container spacing={2}>
                    {filtered.length ? (
                      <>
                        {paginate(filtered, perPage, page).map(
                          (horario, index) => (
                            <Results
                              key={horario.ID_AGENDA_FONE}
                              horario={horario}
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
                            Não existe agendamento nos próximos dias
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

export default AgendaView;
