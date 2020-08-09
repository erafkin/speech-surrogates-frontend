import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import BlogReducer from './blog-reducer';
import grantLanguageReducer from './grant-language-reducer';
import newsReducer from './news-reducer';
import mapReducer from './map-reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  blog: BlogReducer,
  grantLanguage: grantLanguageReducer,
  news: newsReducer,
  map: mapReducer,
});

export default rootReducer;
