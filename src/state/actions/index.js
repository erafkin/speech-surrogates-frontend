// import all actions and action types from various action files

import {
  ActionTypes as userActionTypes,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  clearUserData,
  getAllUsers,
  signIn,
  signOut,
  resetPassword,
  setUserBio,
  getUserBio,
} from './user-actions';

import {
  ActionTypes as blogActionTypes,
  getBlog,
  getAllBlogs,
  updateBlog,
  createBlog,
  setBlog,
  getAllKeywords,
  commentBlog,
  getMostRecentBlog,
  getBlogCount,
} from './blog-actions';

import {
  ActionTypes as grantLanguageActionTypes,
  getGrantLanguage,
  getAllGrantLanguages,
  setGrantLanguage,
  createGrantLanguage,
  updateGrantLanguage,
  deleteIndivGrantLang,

} from './grant-languages-actions';

import {
  ActionTypes as newsActionTypes,
  getAllNews,
  createNews,
  deleteNews,
} from './news-actions';

import {
  ActionTypes as mapActionTypes,
  getIndivMapLang,
  getAllMapLangs,
  updateIndivMapLang,
  createIndivMapLang,
  setIndivMapLang,
  deleteIndivMapLang,
} from './map-actions';

import {
  ActionTypes as aboutActonTypes,
  getAllAboutPages,
  getAboutPage,
  updateAboutPage,
  createAboutPage,
  setAboutPage,
  deleteAboutPage,
} from './about-actions';

// combine all action types
const ActionTypes = {};

Object.keys(userActionTypes).forEach((key) => {
  ActionTypes[key] = userActionTypes[key];
});
Object.keys(blogActionTypes).forEach((key) => {
  ActionTypes[key] = blogActionTypes[key];
});
Object.keys(grantLanguageActionTypes).forEach((key) => {
  ActionTypes[key] = grantLanguageActionTypes[key];
});
Object.keys(newsActionTypes).forEach((key) => {
  ActionTypes[key] = newsActionTypes[key];
});
Object.keys(mapActionTypes).forEach((key) => {
  ActionTypes[key] = mapActionTypes[key];
});
Object.keys(aboutActonTypes).forEach((key) => {
  ActionTypes[key] = aboutActonTypes[key];
});
// export all action types in one object, as well as each action
export {
  ActionTypes,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  clearUserData,
  getAllUsers,
  signIn,
  signOut,
  getBlog,
  getAllBlogs,
  updateBlog,
  createBlog,
  setBlog,
  resetPassword,
  getAllKeywords,
  commentBlog,
  getAllGrantLanguages,
  getGrantLanguage,
  setGrantLanguage,
  createGrantLanguage,
  updateGrantLanguage,
  setUserBio,
  getUserBio,
  createNews,
  getAllNews,
  deleteNews,
  getIndivMapLang,
  getAllMapLangs,
  updateIndivMapLang,
  createIndivMapLang,
  setIndivMapLang,
  deleteIndivMapLang,
  deleteIndivGrantLang,
  getAllAboutPages,
  getAboutPage,
  createAboutPage,
  updateAboutPage,
  deleteAboutPage,
  setAboutPage,
  getMostRecentBlog,
  getBlogCount,
};
