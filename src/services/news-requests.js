/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/news`;

const getAllNews = () => {
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

const createNews = (news, user, token) => {
  return new Promise((resolve, reject) => {
    console.log(news);
    console.log(user);
    axios.post(URL, { news, user }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const deleteNews = (news, user, token) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/${news._id}`, { news, user }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
export {
  getAllNews,
  createNews,
  deleteNews,
};
