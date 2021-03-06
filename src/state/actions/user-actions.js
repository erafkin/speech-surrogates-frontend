import * as userRequests from '../../services/user-requests';
import * as authRequests from '../../services/auth-requests';
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USERNAME_KEY } from '../../constants';

// written by Thomas Monfre

const ActionTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  SET_TOKEN: 'SET_TOKEN',
  SET_ALL_USERS: 'SET_ALL_USERS',
  SET_USER_BIO: 'SET_USER_BIO',
  UPDATE_USER: 'UPDATE_USER',

  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const signIn = (username, password, success, failure) => {
  return (dispatch) => {
    authRequests.signIn(username, password)
      .then((token) => {
        dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);

        userRequests
          .getUser(token, username)
          .then((response) => {
            dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });

            // call user success callback
            if (success) {
              success(token);
            }
          })
          .catch((error) => {
            dispatch({ type: ActionTypes.API_ERROR, payload: error });

            // call user failure callback
            if (failure) {
              failure();
            }
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });

        // call user failure callback
        if (failure) {
          failure(error);
        }
      });
  };
};

const signOut = () => {
  return (dispatch) => {
    authRequests.signOut();
    dispatch({ type: ActionTypes.SET_TOKEN, payload: '' });
    dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
  };
};

// make an asyncronous request to the server to get the user object
const getUser = (token, username) => {
  return (dispatch, getState) => {
    userRequests
      .getUser(token || getState().user.token, username)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });

        // store token if user wanted to update that
        if (token) {
          dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const createUser = (fields, signInAfterCreate, success, failure) => {
  return (dispatch, getState) => {
    authRequests
      .signUp(fields)
      .then(() => {
        if (signInAfterCreate) {
          authRequests.signIn(fields.username, fields.password)
            .then((token) => {
              dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
              localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
              localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, fields.username);

              userRequests
                .getUser(token, fields.username)
                .then((response) => {
                  dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });

                  // call user success callback
                  if (success) {
                    success(token);
                  }
                })
                .catch((error) => {
                  dispatch({ type: ActionTypes.API_ERROR, payload: error });

                  // call user failure callback
                  if (failure) {
                    failure(error);
                  }
                });
            })
            .catch((error) => {
              dispatch({ type: ActionTypes.API_ERROR, payload: error });

              // call user failure callback
              if (failure) {
                failure(error);
              }
            });
        } else if (success) {
          // call user success callback
          success();
        }

        userRequests
          .getAllUsers(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || getState().user.token)
          .then((response) => {
            dispatch({ type: ActionTypes.SET_ALL_USERS, payload: response });
          })
          .catch((error) => {
            dispatch({ type: ActionTypes.API_ERROR, payload: error });
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// make an asyncronous request to the server to update user fields, then get the user data
const updateUser = (user, success, failure) => {
  return (dispatch, getState) => {
    userRequests
      .updateUser(getState().user.token, user)
      .then((updatedUser) => {
        userRequests
          .getAllUsers(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || getState().user.token)
          .then((response) => {
            dispatch({ type: ActionTypes.UPDATE_USER, payload: [response, updatedUser] });
            if (success) {
              success();
            }
          })
          .catch((error) => {
            dispatch({ type: ActionTypes.API_ERROR, payload: error });
            if (failure) {
              failure(error);
            }
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
        failure(error);
      });
  };
};


const deleteUser = (username) => {
  return (dispatch, getState) => {
    userRequests
      .deleteUser(getState().user.token, username)
      .then(() => {
        if (username === getState().user.user.username) {
          dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
          dispatch({ type: ActionTypes.SET_TOKEN, payload: '' });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });

    userRequests
      .getAllUsers(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || getState().user.token)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_ALL_USERS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const clearUserData = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
  };
};

const resetPassword = (email, username, success, failure) => {
  return (dispatch) => {
    userRequests.resetPassword(email, username)
      .then((response) => {
        console.log('success');
        dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
        if (success) {
          success();
        }
      })
      .catch((error) => {
        console.log('failure');
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
        if (failure) {
          failure();
        }
      });
  };
};

// get all user objects from the database
const getAllUsers = () => {
  return (dispatch, getState) => {
    userRequests
      .getAllUsers(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || getState().user.token)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_ALL_USERS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const setUserBio = (user) => {
  return { type: ActionTypes.SET_USER_BIO, payload: user };
};

const getUserBio = (token, username) => {
  return (dispatch, getState) => {
    userRequests
      .getUser(token || getState().user.token, username)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_USER_BIO, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

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
  resetPassword,
  setUserBio,
  getUserBio,
};
