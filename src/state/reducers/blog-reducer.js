import { ActionTypes } from '../actions/index';

const initialState = {
  blog: {},
  allBlogs: [],
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_BLOG:
      return { ...state, blog: action.payload };

    case ActionTypes.SET_BLOGS:
      return { ...state, allBlogs: action.payload.reverse() };

    default:
      return state;
  }
};

export default BlogReducer;
