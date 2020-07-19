import { ActionTypes } from '../actions/index';

const initialState = {
  news: [],
};

const NewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_NEWS:
      return { ...state, news: action.payload.reverse() };
    default:
      return state;
  }
};

export default NewsReducer;
