import * as grantLanguageRequests from '../../services/grant-languages-requests';

const ActionTypes = {
  SET_GRANT_LANGUAGE: 'SET_GRANT_LANGUAGE',
  SET_GRANT_LANGUAGES: 'SET_GRANT_LANGUAGES',

  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const getGrantLanguage = (id) => {
  return (dispatch, getState) => {
    grantLanguageRequests
      .getGrantLanguage(id)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_GRANT_LANGUAGE, payload: response[0] });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const getAllGrantLanguages = () => {
  return (dispatch) => {
    grantLanguageRequests
      .getAllGrantLanguages()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_GRANT_LANGUAGES, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const setGrantLanguage = (lang) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_GRANT_LANGUAGE, payload: lang });
  };
};

const createGrantLanguage = (g, u, success, failure) => {
  return (dispatch, getState) => {
    grantLanguageRequests
      .createGrantLanguage({ token: getState().user.token, grantLanguage: g, user: u })
      .then((response) => {
        grantLanguageRequests
          .getAllGrantLanguages()
          .then((resp) => {
            dispatch({ type: ActionTypes.SET_GRANT_LANGUAGES, payload: resp });
            if (success !== undefined) {
              success();
            }
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
        if (failure) {
          failure(error);
        }
      });
  };
};


const updateGrantLanguage = (g, u, success, failure) => {
  return (dispatch, getState) => {
    grantLanguageRequests
      .updateGrantLanguage(getState().user.token, { id: g._id, grantLanguage: g, user: u })
      .then((response) => {
        dispatch({ type: ActionTypes.SET_GRANT_LANGUAGE, payload: response });
        if (success !== undefined) {
          success();
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
        if (failure) {
          failure(error);
        }
      });
  };
};
const deleteIndivGrantLang = (gl, success, failure) => {
  return (dispatch, getState) => {
    grantLanguageRequests
      .deleteIndivGrantLang(gl, getState().user.token)
      .then((response) => {
        grantLanguageRequests.getAllGrantLanguages()
          .then((res) => {
            dispatch({ type: ActionTypes.SET_GRANT_LANGUAGES, payload: res });
            if (success !== undefined) {
              success();
            }
          })
          .catch((err) => {
            dispatch({ type: ActionTypes.API_ERROR, payload: err });
            if (failure) {
              failure(err);
            }
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
        if (failure) {
          failure(error);
        }
      });
  };
};

export {
  ActionTypes,
  getGrantLanguage,
  getAllGrantLanguages,
  setGrantLanguage,
  createGrantLanguage,
  updateGrantLanguage,
  deleteIndivGrantLang,
};
