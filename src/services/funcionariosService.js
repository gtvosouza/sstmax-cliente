import { postRequest, getRequest } from './requests';

class FuncionarioService {
  
  post = data => {
    return new Promise((resolve, reject) => {
        postRequest('/funcionario', data, resolve, reject);
    });
  };

  get = (idEmpresa) =>
  new Promise((resolve, reject) => {
    getRequest(`/funcionario/all?idEmpresa=${idEmpresa}`, resolve, reject);
  });



}

export default new FuncionarioService();
