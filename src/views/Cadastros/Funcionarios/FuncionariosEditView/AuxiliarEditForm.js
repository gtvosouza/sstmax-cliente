import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';
import auxiliarService from 'src/services/funcionariosService';

const useStyles = makeStyles(() => ({
  root: {}
}));

function CustomerEditForm({
  className,
  auxiliar,
  tipos,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        _id:  auxiliar._id || '',
        descricao:  auxiliar.descricao || '',
        ativo:  auxiliar.ativo || true,
        flag: auxiliar.flag || 'situacao'
      }}

      validationSchema={Yup.object().shape({
        descricao: Yup.string().max(255).required('Necessário informar a descrição')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          console.log(values);

          var result;// = await auxiliarService.postAuxiliar(values);
          
          if (!!result._id)
             values._id = result._id;

          enqueueSnackbar('Registro Atualizado com sucesso.', {
            variant: 'success',
          });
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
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Descrição"
                    name="descricao"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.descricao}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                      fullWidth
                      label="Tipo do Registro"
                      name="flag"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.flag}
                      variant="outlined"
                    >
                      {tipos.map((tipo) => (
                        <option
                          key={tipo.value}
                          value={tipo.value}
                        >
                          {tipo.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                <Grid item />
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h5"
                    color="textPrimary">
                    Ativo
                  </Typography>
                  <Switch
                    checked={values.ativo}
                    color="secondary"
                    edge="start"
                    name="ativo"
                    onChange={handleChange}
                    value={values.ativo}
                  />
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
  auxiliar: PropTypes.object.isRequired
};

export default CustomerEditForm;
