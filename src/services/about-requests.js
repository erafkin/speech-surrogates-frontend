import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/about`;

const getAllAboutPages = () => {
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

const getAboutPage = (id) => {
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

const createAboutPage = (fields) => {
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

const updateAboutPage = (token, fields) => {
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

const deleteAboutPage = (about, token) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/${about._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};


export {
  getAllAboutPages,
  getAboutPage,
  createAboutPage,
  updateAboutPage,
  deleteAboutPage,
};
