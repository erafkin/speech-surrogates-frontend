/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/grant-languages/`;

/**
 * retrieve all grant language objects in the database
 */
const getAllGrantLanguages = () => {
  return new Promise((resolve, reject) => {
    axios.get(URL)
      .then((response) => {
        console.log(response.data.response);
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


export {
  getAllGrantLanguages,
  getGrantLanguage,
};
