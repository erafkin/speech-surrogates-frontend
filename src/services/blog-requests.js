/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/blog`;

/**
 * retrieve all user objects in the database
 */
const getAllBlogs = () => {
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
 * retrieve single user object by username
 * @param {string} username username to retrieve
 */
const getBlog = (id) => {
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
 * update blog object by id
 * @param {string} token auth token
 * @param {string} id the id to update in the database
 * @param {object} blog values to change for the blog
 */
const updateBlog = (token, id, blog) => {
  return new Promise((resolve, reject) => {
    axios.put(`${URL}/${id}`, blog, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * update blog object by id
 * @param {object} fields values to change for the blog
 */
const createBlog = (fields) => {
  return new Promise((resolve, reject) => {
    axios.post(URL, fields)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};


export {
  getAllBlogs,
  getBlog,
  updateBlog,
  createBlog,
};
