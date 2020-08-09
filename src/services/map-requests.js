/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/map`;

const getAllMapLangs = () => {
  return new Promise((resolve, reject) => {
    axios.get(URL)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const getIndivMapLang = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/${id}`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const updateIndivMapLang = (token, fields) => {
  return new Promise((resolve, reject) => {
    axios.put(`${URL}/${fields.id}`, fields, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const createIndivMapLang = (fields) => {
  return new Promise((resolve, reject) => {
    axios.post(URL, fields, { headers: { Authorization: `Bearer ${fields.token}` } })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const deleteIndivMapLang = (map, token) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/${map._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};


export {
  getAllMapLangs,
  getIndivMapLang,
  createIndivMapLang,
  updateIndivMapLang,
  deleteIndivMapLang,
};
