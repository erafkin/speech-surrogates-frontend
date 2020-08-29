import * as aboutRequests from '../../services/about-requests';

const ActionTypes = {
  SET_ABOUT_PAGE: 'SET_ABOUT_PAGE',
  SET_ABOUT_PAGES: 'SET_ABOUT_PAGES',

  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const getAboutPage = (id) => {
  return (dispatch) => {
    aboutRequests
      .getAboutPage(id)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_ABOUT_PAGE, payload: response[0] });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const getAllAboutPages = () => {
  return (dispatch) => {
    aboutRequests
      .getAllAboutPages()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_ABOUT_PAGES, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const setAboutPage = (about) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_ABOUT_PAGE, payload: about });
  };
};

const createAboutPage = (a, u, success, failure) => {
  return (dispatch, getState) => {
    aboutRequests
      .createAboutPage({ token: getState().user.token, about: a, user: u })
      .then((response) => {
        aboutRequests
          .getAllAboutPages()
          .then((resp) => {
            dispatch({ type: ActionTypes.SET_ABOUT_PAGES, payload: resp });
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


const updateAboutPage = (a, u, success, failure) => {
  return (dispatch, getState) => {
    aboutRequests
      .updateAboutPage(getState().user.token, { id: a._id, about: a, user: u })
      .then((response) => {
        dispatch({ type: ActionTypes.SET_ABOUT_PAGE, payload: response });
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

const deleteAboutPage = (a, success, failure) => {
  return (dispatch, getState) => {
    aboutRequests
      .deleteAboutPage(a, getState().user.token)
      .then((response) => {
        aboutRequests.getAllAboutPages()
          .then((res) => {
            dispatch({ type: ActionTypes.SET_ABOUT_PAGES, payload: res });
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
  getAllAboutPages,
  getAboutPage,
  createAboutPage,
  updateAboutPage,
  deleteAboutPage,
  setAboutPage,
};
