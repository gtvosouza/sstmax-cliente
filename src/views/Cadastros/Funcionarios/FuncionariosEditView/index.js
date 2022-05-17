import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import AuxiliarEditForm from './AuxiliarEditForm';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AuxiliarView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [auxiliar, setAuxiliar] = useState(null);
  const { idAuxiliar } = useParams();
  const [tipos, setTipos] = useState([]);
  
  const getAuxiliar = useCallback(() => {   
  
  }, [isMountedRef]);

  
  const getAuxiliaresTipos = useCallback(() => {
   
  }, [isMountedRef]);

  
  if (!auxiliar) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Agendamento"
    >
      <Container maxWidth={false}>
        <Header /> 
        
        <Box mt={3}>        
          <AuxiliarEditForm auxiliar={auxiliar} tipos = {tipos} />
        </Box>
        
        </Container>
    </Page>
  );
}

export default AuxiliarView;
