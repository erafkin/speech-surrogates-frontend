import { ActionTypes } from '../actions/index';

const initialState = {
  blog: {},
  allBlogs: [],
  keywords: [],
};

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_BLOG:
      console.log(action.payload);
      return { ...state, blog: action.payload };

    case ActionTypes.SET_BLOGS:
      return { ...state, allBlogs: action.payload.reverse() };
    case ActionTypes.SET_KEYWORDS:
      return { ...state, keywords: action.payload.sort(compare) };

    default:
      return state;
  }
};

export default BlogReducer;
