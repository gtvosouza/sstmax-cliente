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
import FuncionarioEditForm from './FuncionarioEditForm';
import FuncaoService from '../../../../services/funcaoService'
import { useParams } from 'react-router-dom';
import funcionariosService from 'src/services/funcionariosService';

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
  const [funcionario, setFuncionario] = useState(null);
  const [funcoes, setFuncoes] = useState([]);  
  const { idFuncionario } = useParams();
  const idEmpresa = localStorage.getItem('idEmpresa');
  
  const defaultValues = {
    ID_FUNCIONARIO:  0,
    NOME_FUNCIONARIO:   '',
    ID_FUNCAO:  0,
    DATA_NASC:new Date(),
    DATA_ADMISSAO:  new Date(),
    SEXO: 'M',
    CPF:  '',
    MATRICULA_ESOCIAL:  '',
    SETOR: '',
  }

   
  useEffect(() => {

    async function getFuncionario() { 
      const result = await funcionariosService.getOne(idEmpresa, idFuncionario);
  
      if(!!result) {
        if(result.length > 0)
            setFuncionario(result[0]);
      }
        
    }
      
    async function getFuncoes() {
      const response = await FuncaoService.get(idEmpresa);
      setFuncoes(response);
    }

    if(idFuncionario !== undefined) {
      getFuncionario()
    } else {
      setFuncionario(defaultValues);
    }

    getFuncoes();
  }, [, idFuncionario]);



  return (
    <Page
      className={classes.root}
      title="Funcionarios"
    >
      <Container maxWidth={false}>
        <Header /> 
        
        <Box mt={3}>     
        
        {funcionario !== null && funcoes !== undefined  ? 
        (
          <FuncionarioEditForm funcionario={funcionario} funcoes={funcoes}/>
        )   
        : (<> </>)
         }
         
        </Box>
        
        </Container>
    </Page>
  );
}

export default FuncionarioView;
