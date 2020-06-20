import { ActionTypes } from '../actions/index';

const initialState = {
  blog: {},
  allBlogs: [],
  keywords: [],
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_BLOG:
      console.log(action.payload);
      return { ...state, blog: action.payload };

    case ActionTypes.SET_BLOGS:
      return { ...state, allBlogs: action.payload.reverse() };
    case ActionTypes.SET_KEYWORDS:
      return { ...state, keywords: action.payload.reverse() };

    default:
      return state;
  }
};

export default BlogReducer;
