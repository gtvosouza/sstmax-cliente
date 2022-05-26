import { getRequest  } from './requests';

class AgendaService {  
  get = () =>
    new Promise((resolve, reject) => {
      getRequest(`/agenda`, resolve, reject);
    });
}

export default new AgendaService();
