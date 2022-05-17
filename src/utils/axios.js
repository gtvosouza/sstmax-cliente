import axios from 'axios';

import { API_BASE_URL_AUTH } from '../config';

const instance = axios.create({
    baseURL: API_BASE_URL_AUTH
  });

export default instance;
