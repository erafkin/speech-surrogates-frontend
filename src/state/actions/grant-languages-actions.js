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
        dispatch({ type: ActionTypes.SET_GRANT_LANGUAGE, payload: response });
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
export {
  ActionTypes,
  getGrantLanguage,
  getAllGrantLanguages,
  setGrantLanguage,
  createGrantLanguage,
  updateGrantLanguage,
};
