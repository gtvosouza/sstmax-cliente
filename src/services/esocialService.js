import { getRequest  } from './requests';

class ESOCIALService {  
  get = () =>
    new Promise((resolve, reject) => {
      getRequest(`/esocial`, resolve, reject);
    });
}

export default new ESOCIALService();
