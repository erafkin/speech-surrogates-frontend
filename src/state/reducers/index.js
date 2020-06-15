import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import BlogReducer from './blog-reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  blog: BlogReducer,

});

export default rootReducer;
