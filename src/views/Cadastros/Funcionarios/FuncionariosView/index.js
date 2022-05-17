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
import FuncionarioService from '../../../../services/funcionariosService'
import Filters from './Filter';
import Loading from 'src/components/Loading';
import paginate from 'src/utils/paginate';
import Results from './Results';
import Pagination from '@material-ui/lab/Pagination';

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
  const [funcionarios, setFuncionarios] = useState([]);
  
  const searchDefaultValues = {
    nome: ''  
  };

  const [search, setSearch] = useState(searchDefaultValues);
  
  const resetSearch = () => {
    setSearch(searchDefaultValues);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState({});
  const perPage = 12;

  const getFuncionarios = useCallback(() => {
    FuncionarioService.get(4130).then((response) => {
      if (isMountedRef.current) {
        setFuncionarios(response);
      }
    });    

  }, [isMountedRef]);
  
  useEffect(() => {
    getFuncionarios();
  }, []);


  
  const executeFilter = () => {
    return funcionarios.filter(f => {
      let found = false;

      if (!found && search.name) {
        found = !f.NOME_FUNCIONARIO.toLowerCase().includes(search.nome.toLowerCase());
      }

      return !found;
    });
  };

  useEffect(() => {
    //setFiltered(executeFilter);    
    if (funcionarios != undefined) {
      setFiltered(executeFilter);      
      setIsLoading(false);
    } 
  }, [funcionarios]);
  

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
                  <Loading message="Buscando empresas..." />
                ) : (
                  <Grid container spacing={2}>
                    {filtered.length ? (
                      <>
                        {paginate(filtered, perPage, page).map(
                          (funcionario, index) => (
                            <Results
                              key={funcionario.ID_FUNCIONARIO}
                              funcionario={funcionario}
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
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography variant="h5">
                            Nenhuma empresa encontrada
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
