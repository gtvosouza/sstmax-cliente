import { postRequest, getRequest, putRequest } from './requests';

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

  getOne = (idEmpresa, idFuncionario) =>
  new Promise((resolve, reject) => {
    getRequest(`/funcionario/all?idEmpresa=${idEmpresa}&idFuncionario=${idFuncionario}`, resolve, reject);
  });

  
  put = data => {
    return new Promise((resolve, reject) => {
      putRequest('/funcionario', data, resolve, reject);
    });
  };

}

export default new FuncionarioService();
