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

} from './blog-actions';

import {
  ActionTypes as grantLanguageActionTypes,
  getGrantLanguage,
  getAllGrantLanguages,
  setGrantLanguage,

} from './grant-languages-actions';


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
};
