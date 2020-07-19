import * as newsRequests from '../../services/news-requests';

const ActionTypes = {
  SET_NEWS: 'SET_NEWS',
  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const getAllNews = () => {
  return (dispatch) => {
    newsRequests
      .getAllNews()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_NEWS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const createNews = (news, user) => {
  return (dispatch, getState) => {
    newsRequests
      .createNews(news, user, getState().user.token)
      .then((response) => {
        newsRequests.getAllNews()
          .then((res) => {
            dispatch({ type: ActionTypes.SET_NEWS, payload: res });
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const deleteNews = (news, user) => {
  return (dispatch, getState) => {
    newsRequests
      .deleteNews(news, user, getState().user.token)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_NEWS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

export {
  ActionTypes,
  getAllNews,
  createNews,
  deleteNews,
};
