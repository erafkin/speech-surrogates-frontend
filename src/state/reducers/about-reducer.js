import { ActionTypes } from '../actions/index';

const initialState = {
  aboutPage: {},
  allAboutPages: [],
};

const AboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ABOUT_PAGE:
      return { ...state, aboutPage: action.payload };
    case ActionTypes.SET_ABOUT_PAGES:
      return { ...state, allAboutPages: action.payload };
    default:
      return state;
  }
};

export default AboutReducer;
