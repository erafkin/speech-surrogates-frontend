import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import BlogReducer from './blog-reducer';
import grantLanguageReducer from './grant-language-reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  blog: BlogReducer,
  grantLanguage: grantLanguageReducer,

});

export default rootReducer;
