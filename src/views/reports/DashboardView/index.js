import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import DashboardService from '../../../services/dashboardService';

import EventoeSocial from './EventoeSocial';
import Consultas from './PerformanceOverTime';
import Financeiro from './Financeiro';
import Funcoes from './Funcoes';
import FuncionariosAtivos from './FuncionariosAtivos'; 
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function DashboardView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  const [dashboard, setDashboard] = useState({
                                            FUNCIONARIOS_ATIVOS: 0,
                                            FINANCEIRO: 0,
                                            ESOCIAL: 0,
                                            FUNCOES: 0
                                          });

  const [consulta, setConsulta] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

const getConsultas = useCallback(() => {
  DashboardService.getConsultas().then((response) => {
    if (isMountedRef.current) {
      setConsulta(response);
      console.log(response)
    }
  });    

}, [isMountedRef]);

const getDashboard = useCallback(() => {
  DashboardService.get().then((response) => {
    if (isMountedRef.current) {
      setDashboard(response);
      console.log(response)
    }
  });    

}, [isMountedRef]);

useEffect(() => {    
  getDashboard()
  getConsultas()

}, []);


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <FuncionariosAtivos qtdeFuncionario = {dashboard.FUNCIONARIOS_ATIVOS}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <EventoeSocial  qtdeEventos = {dashboard.ESOCIAL}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Funcoes  qtdeFuncoes={dashboard.FUNCOES}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Financeiro valor = {dashboard.FINANCEIRO} />
          </Grid>
       
          <Grid
            item
            lg={12} 
            xs={12}
          >
            <Consultas consulta={consulta}/>
          </Grid>              
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardView;
