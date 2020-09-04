import { ActionTypes } from '../actions/index';

const initialState = {
  map: [],
  indivMapLang: {},
  parameters: [],
};

const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MAP:
      return {
        ...state,
        map: action.payload.languages === undefined ? action.payload : action.payload.languages,
        parameters: action.payload.parameters === undefined ? state.parameters : action.payload.parameters,
      };
    case ActionTypes.SET_INDIV_MAP:
      return { ...state, indivMapLang: action.payload };
    default:
      return state;
  }
};

export default MapReducer;
