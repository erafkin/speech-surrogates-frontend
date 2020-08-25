/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/grant-languages`;

/**
 * retrieve all grant language objects in the database
 */
const getAllGrantLanguages = () => {
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

/**
 * retrieve single grantLanguage object by username
 * @param {string} id id to retrieve
 */
const getGrantLanguage = (id) => {
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

/**
 * create language object by id
 * @param {object} fields values to add for the create
 */
const createGrantLanguage = (fields) => {
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

const updateGrantLanguage = (token, fields) => {
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
const deleteIndivGrantLang = (gl, token) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/${gl._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};


export {
  getAllGrantLanguages,
  getGrantLanguage,
  createGrantLanguage,
  updateGrantLanguage,
  deleteIndivGrantLang,
};
