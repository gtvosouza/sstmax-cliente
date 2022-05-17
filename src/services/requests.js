import axios from 'src/utils/axios';

export const getRequest = (url, resolve, reject) =>
axios
    .get(url)
    .then(response => {
      const { data } = response;
      resolve(data);
    })
    .catch(error => {
      console.log(error)
      reject(error);
    });

export const putRequest = (url, data, resolve, reject) => {
  return axios
    .put(url, data)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.response.data);
    });
};

export const deleteRequest = (url,  resolve, reject) => {
  return axios
    .delete(url)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.response.data);
    });
};

export const postRequest = (url, data, resolve, reject) => {
  return axios
    .post(url, data)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.response.data);
    });
};