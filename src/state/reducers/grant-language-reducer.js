import { ActionTypes } from '../actions/index';

const initialState = {
  grantLanguage: {},
  allGrantLanguages: [],
};

const GrantLanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_GRANT_LANGUAGE:
      return { ...state, grantLanguage: action.payload };
    case ActionTypes.SET_GRANT_LANGUAGES:
      return { ...state, allGrantLanguages: action.payload };
    default:
      return state;
  }
};

export default GrantLanguageReducer;
