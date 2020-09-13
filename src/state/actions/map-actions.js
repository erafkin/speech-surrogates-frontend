import * as mapRequests from '../../services/map-requests';

const ActionTypes = {
  SET_MAP: 'SET_MAP',
  SET_INDIV_MAP: 'SET_INDIV_MAP',
  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const getIndivMapLang = (id) => {
  return (dispatch, getState) => {
    mapRequests
      .getIndivMapLang(id)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_INDIV_MAP, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const getAllMapLangs = () => {
  return (dispatch) => {
    mapRequests
      .getAllMapLangs()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_MAP, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};


const updateIndivMapLang = (m, u, success, failure) => {
  return (dispatch, getState) => {
    mapRequests
      .updateIndivMapLang(getState().user.token, { id: m._id, language: m, user: u })
      .then((response) => {
        mapRequests.getAllMapLangs()
          .then((resp) => {
            dispatch({ type: ActionTypes.SET_MAP, payload: resp });
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
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
        if (failure) {
          failure(error);
        }
      });
  };
};

const createIndivMapLang = (m, u, success, failure) => {
  return (dispatch, getState) => {
    mapRequests
      .createIndivMapLang({ token: getState().user.token, map: m, user: u })
      .then((response) => {
        dispatch({ type: ActionTypes.SET_INDIV_MAP, payload: response });
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
const deleteIndivMapLang = (map, success, failure) => {
  return (dispatch, getState) => {
    mapRequests
      .deleteIndivMapLang(map, getState().user.token)
      .then((response) => {
        mapRequests.getAllMapLangs()
          .then((res) => {
            dispatch({ type: ActionTypes.SET_MAP, payload: res });
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

const setIndivMapLang = (m) => {
  return ({ type: ActionTypes.SET_INDIV_MAP, payload: m });
};

export {
  ActionTypes,
  getIndivMapLang,
  getAllMapLangs,
  updateIndivMapLang,
  createIndivMapLang,
  setIndivMapLang,
  deleteIndivMapLang,
};
