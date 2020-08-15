/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/users`;

/**
 * retrieve all user objects in the database
 * @param {string} token auth token
 */
const getAllUsers = (token) => {
  return new Promise((resolve, reject) => {
    axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * retrieve single user object by username
 * @param {string} token auth token
 * @param {string} username username to retrieve
 */
const getUser = (token, username) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/${username}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * update user object by username
 * @param {string} token auth token
 * @param {string} username the username to update in the database
 * @param {object} fields values to change for the user
 */
const updateUser = (token, u) => {
  return new Promise((resolve, reject) => {
    axios.put(`${URL}/${u._id}`, { user: u }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * delete user object by username
 * @param {string} token auth token
 * @param {string} username the username to delete in the database
 */
const deleteUser = (token, username) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/${username}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * retrieve single user object by username
 * @param {string} email username to retrieve
  * @param {string} user username to retrieve
 */
const resetPassword = (e, u) => {
  return new Promise((resolve, reject) => {
    axios.post(`${URL}/reset-password`, { email: e, username: u })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  resetPassword,
};
