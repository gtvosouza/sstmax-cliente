import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack'; 
import FuncaoService from '../../../../services/funcaoService'
import FuncionarioService from '../../../../services/funcionariosService'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { DatePicker,KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(() => ({
  root: {}
}));

function CustomerEditForm({
  className,
  funcionario,  
  mode,
  funcoes,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [funcoesBranco, setFuncoesBranco] = useState([{ID_FUNCAO:0, NOME_FUNCAO:""}]); 

  useEffect(() => {    
    if (funcoes !== undefined)
      setFuncoesBranco(funcoesBranco.concat(funcoes));
  }, [funcoes]);

  return (
    <Formik
     initialValues={{
        ID_FUNCIONARIO: funcionario.ID_FUNCIONARIO || 0,
        NOME_FUNCIONARIO:  funcionario.NOME_FUNCIONARIO || '',
        ID_FUNCAO:  funcionario.ID_FUNCAO || 0,
        DATA_NASC: new Date(funcionario.DATA_NASC) || new Date(),
        DATA_ADMISSAO:  new Date(funcionario.DATA_ADMISSAO) || new Date(),
        SEXO:  funcionario.SEXO || 'M',
        CPF:  funcionario.CPF || '',
        MATRICULA_ESOCIAL:  funcionario.MATRICULA_ESOCIAL || '',
        SETOR:  funcionario.SETOR || '',
      }}
      

    validationSchema={Yup.object().shape({
      NOME_FUNCIONARIO: Yup.string().max(255).required('Necessário informar o Nome do Funcionário'),
      CPF: Yup.string().max(11).required('Necessário informar o Nome do Funcionário'),
      MATRICULA_ESOCIAL : Yup.string().required('Necessário informar a Matricula do eSocial'),
    })}
    onSubmit={async (values, {
      resetForm,
      setErrors,
      setStatus,
      setSubmitting
    }) => {
      try {
        if(window.location.pathname.includes('create')) {
          const result = await FuncionarioService.post(values)  

          if(!!result) {
            enqueueSnackbar('Registro criado com sucesso.', {
              variant: 'success',
            });
          }else{
            enqueueSnackbar('Falha ao gravar o registro.', {
              variant: 'error',
            });
          }
        } else {
          const result = await FuncionarioService.put(values)  

          console.log(result)
          if(!!result) {
            enqueueSnackbar('Registro atualizado com sucesso.', {
              variant: 'success',
            });
          }else{
            enqueueSnackbar('Falha ao gravar o registro.', {
              variant: 'error',
            });
          }
        }
      } catch (error) {
        setStatus({ success: false });
        setErrors({ submit: error.message });
        setSubmitting(false);
      }
    }}
  >
    {({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,	 
      setFieldTouched,
      setFieldValue,
      isSubmitting,
      touched,
      values
    }) => (
      <form
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
        {...rest}
      >

        <Card>
          <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={12}
            >             
              <Box mt={3}>
                <Card>
                  <CardHeader title="Funcionário" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >                           
                      <Grid item xs={12} md={12}>
                        <TextField
                          error={Boolean(touched.NOME_FUNCIONARIO && errors.NOME_FUNCIONARIO)}
                          fullWidth
                          helperText={touched.NOME_FUNCIONARIO && errors.NOME_FUNCIONARIO}
                          label="Nome"
                          name="NOME_FUNCIONARIO"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.NOME_FUNCIONARIO}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          label="Função"
                          name="ID_FUNCAO"
                          onChange={handleChange}
                          select
                          SelectProps={{ native: true }}
                          value={values.ID_FUNCAO}
                          variant="outlined"
                        >
                          {funcoesBranco.map((funcao) => (
                            <option
                              key={funcao.ID_FUNCAO}
                              value={funcao.ID_FUNCAO}
                            >
                              {funcao.NOME_FUNCAO}
                            </option>
                          ))}                         
                        </TextField>
                      </Grid>
                      
                                            
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.SETOR && errors.SETOR)}
                          fullWidth
                          helperText={touched.SETOR && errors.SETOR}
                          label="Setor"
                          name="SETOR"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.SETOR}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <KeyboardDatePicker
                            autoOk
                            fullWidth
                            variant="inline"
                            inputVariant="outlined"
                            label="Data de Nascimento"
                            format="DD/MM/yyyy"
                            value={values.DATA_NASC}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={date => setFieldValue('DATA_NASC', date)}
                          />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <KeyboardDatePicker
                          autoOk
                          fullWidth
                          variant="inline"
                          inputVariant="outlined"
                          label="Data de Admissão"
                          format="DD/MM/yyyy"
                          value={values.DATA_ADMISSAO}
                          InputAdornmentProps={{ position: "start" }}
                          onChange={date => setFieldValue('DATA_ADMISSAO', date)}
                        />
                        
                          
                      </Grid>
                     
                      <Grid item xs={12} md={3}>
                        <TextField
                            error={Boolean(touched.CPF && errors.CPF)}
                            fullWidth
                            helperText={touched.CPF && errors.CPF}
                            label="CPF"
                            name="CPF"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.CPF}
                            variant="outlined"
                          />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <TextField
                            error={Boolean(touched.MATRICULA_ESOCIAL && errors.MATRICULA_ESOCIAL)}
                            fullWidth
                            helperText={touched.MATRICULA_ESOCIAL && errors.MATRICULA_ESOCIAL}
                            label="Matricula eSocial"
                            name="MATRICULA_ESOCIAL"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.MATRICULA_ESOCIAL}
                            variant="outlined"
                          />
                      </Grid>

                     

                      <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Sexo"
                            name="SEXO"
                            onChange={handleChange}
                            select
                            SelectProps={{ native: true }}
                            value={values.SEXO}
                            variant="outlined"
                          >                            
                              <option
                                key='SEXOMASC'
                                value='M'
                              >
                                Masculino
                              </option>

                              <option
                                key='SEXOFEM'
                                value='F'
                              >
                                Feminino
                              </option>
                           
                        </TextField>
                      </Grid>
                    </Grid>                   
                  </CardContent>
                </Card>
              </Box>
            </Grid>            
          </Grid>
            
            
            <Box mt={2}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isSubmitting}
              >
                Atualizar Registro
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    )}
  </Formik>
  );
}

CustomerEditForm.propTypes = {
  className: PropTypes.string,
  funcionario: PropTypes.object.isRequired,
  funcoes: PropTypes.array.isRequired,
};

export default CustomerEditForm;
