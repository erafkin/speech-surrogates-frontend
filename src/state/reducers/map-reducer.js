import { ActionTypes } from '../actions/index';

const initialState = {
  map: [],
  indivMapLang: {},
};

const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MAP:
      return { ...state, map: action.payload };
    case ActionTypes.SET_INDIV_MAP:
      return { ...state, indivMapLang: action.payload };
    default:
      return state;
  }
};

export default MapReducer;
