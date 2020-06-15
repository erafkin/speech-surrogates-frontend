import * as blogRequests from '../../services/blog-requests';

const ActionTypes = {
  SET_BLOG: 'SET_BLOG',
  SET_BLOGS: 'SET_BLOGS',

  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};


// make an asyncronous request to the server to get the blog object
const getBlog = (id) => {
  return (dispatch, getState) => {
    blogRequests
      .getBlog(id)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_BLOG, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// make an asyncronous request to the server to get all the blogs
const getAllBlogs = () => {
  return (dispatch) => {
    blogRequests
      .getAllBlogs()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_BLOGS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const updateBlog = (blog) => {
  return (dispatch, getState) => {
    blogRequests
      .updateBlog(getState().user.token, blog)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_BLOG, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};
const createBlog = (b, u, success, failure) => {
  return (dispatch) => {
    blogRequests
      .createBlog({ blog: b, user: u })
      .then((response) => {
        dispatch({ type: ActionTypes.SET_BLOG, payload: response });
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
  getBlog,
  getAllBlogs,
  updateBlog,
  createBlog,

};
