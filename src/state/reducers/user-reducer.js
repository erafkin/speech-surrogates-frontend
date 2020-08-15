import { ActionTypes } from '../actions/index';

const initialState = {
  token: '',
  user: {},
  allUsers: [],
  userBio: {},
};

const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, user: action.payload };
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case ActionTypes.CLEAR_USER_DATA:
      return { ...state, user: {}, token: '' };
    case ActionTypes.UPDATE_USER:
      return { ...state, allUsers: action.payload[0], user: action.payload[1] };
    case ActionTypes.SET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case ActionTypes.SET_USER_BIO:
      return { ...state, userBio: action.payload };
    default:
      return state;
  }
};

export default UserInfoReducer;
