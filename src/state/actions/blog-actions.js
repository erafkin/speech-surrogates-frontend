import * as blogRequests from '../../services/blog-requests';

const ActionTypes = {
  SET_BLOG: 'SET_BLOG',
  SET_BLOGS: 'SET_BLOGS',
  SET_KEYWORDS: 'SET_KEYWORDS',
  SET_MOST_RECENT_BLOG: 'SET_MOST_RECENT_BLOG',
  SET_BLOG_COUNT: 'SET_BLOG_COUNT',

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
const getMostRecentBlog = () => {
  return (dispatch, getState) => {
    blogRequests
      .getMostRecentBlog()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_MOST_RECENT_BLOG, payload: response[0] });
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

const getAllKeywords = () => {
  return (dispatch) => {
    blogRequests
      .getAllKeywords()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_KEYWORDS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};


const updateBlog = (b, u, success, failure) => {
  return (dispatch, getState) => {
    blogRequests
      .updateBlog(getState().user.token, { id: b._id, blog: b, user: u })
      .then((response) => {
        console.log(response);
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

const commentBlog = (b, u, success, failure) => {
  return (dispatch, getState) => {
    blogRequests
      .comment({ id: b._id, blog: b, user: u })
      .then((response) => {
        console.log(response);
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
const createBlog = (b, u, success, failure) => {
  return (dispatch, getState) => {
    blogRequests
      .createBlog({ token: getState().user.token, blog: b, user: u })
      .then((response) => {
        dispatch(getAllBlogs());
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
const getBlogCount = () => {
  return (dispatch, getState) => {
    blogRequests
      .getBlogCount()
      .then((response) => {
        dispatch({ type: ActionTypes.SET_BLOG_COUNT, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};
const setBlog = (b) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_BLOG, payload: b });
  };
};

export {
  ActionTypes,
  getBlog,
  getAllBlogs,
  updateBlog,
  createBlog,
  setBlog,
  getAllKeywords,
  commentBlog,
  getMostRecentBlog,
  getBlogCount,
};
