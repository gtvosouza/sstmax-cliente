import jwtDecode from 'jwt-decode';
import axios from 'src/utils/axios';

class AuthService {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();
    const idEmpresa = this.getIdEmpresa();
    const nomeEmpresa = this.getNomeEmpresa();
    const cliente = this.getCliente();

    if (!accessToken || !idEmpresa) {
      return;
    }

    if (this.isValidToken(accessToken)) {
      this.setSession(accessToken, idEmpresa, nomeEmpresa,cliente);
    } else {
      this.setSession(null, null, null, null);
    }
  }

  loginWithCodAndPassword = (codigoUsuario, password) => new Promise((resolve, reject) => {
    axios.post('/auth/client', { usuario: codigoUsuario, senha: password })
      .then((response) => {
        if (response.data.user) {
          this.setSession(response.data.accessToken,response.data.user.id,response.data.user.nome, response.data.user.cliente);

          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  })

  loginInWithToken = () => new Promise((resolve, reject) => {
    axios.post('/auth/validaToken', { })
      .then((response) => {
        if (response.data.user) {          
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
      
  })

  logout = () => {
    this.setSession(null);
  }

  setSession = (accessToken, idEmpresa, nomeEmpresa, cliente) => {
    if (accessToken && idEmpresa) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('idEmpresa', idEmpresa);
      localStorage.setItem('nomeEmpresa', nomeEmpresa);
      localStorage.setItem('cliente', cliente);
      
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idEmpresa');
      localStorage.removeItem('nomeEmpresa');
      localStorage.removeItem('cliente');
      delete axios.defaults.headers.common.Authorization;      
    }
  }

  getAccessToken = () => localStorage.getItem('accessToken');
  getIdEmpresa = () => localStorage.getItem('idEmpresa');
  getNomeEmpresa = () => localStorage.getItem('nomeEmpresa');
  getCliente = () => localStorage.getItem('cliente');

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  }

  isAuthenticated = () => !!this.getAccessToken()
}

const authService = new AuthService();

export default authService;
