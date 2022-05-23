import { getRequest  } from './requests';

class FuncaoService {
  

  get = (idEmpresa) =>
    new Promise((resolve, reject) => {
      getRequest(`/funcao?idEmpresa=${idEmpresa}`, resolve, reject);
    });
}

export default new FuncaoService();
