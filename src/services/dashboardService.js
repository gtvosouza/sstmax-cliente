import { getRequest  } from './requests';

class AgendaService {  
  get = () =>
    new Promise((resolve, reject) => {
      getRequest(`/dashboard`, resolve, reject);
    });

  getConsultas = () =>
    new Promise((resolve, reject) => {
      getRequest(`/dashboard/consultas`, resolve, reject);
    });
}

export default new AgendaService();
