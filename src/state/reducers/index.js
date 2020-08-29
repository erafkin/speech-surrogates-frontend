import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import BlogReducer from './blog-reducer';
import GrantLanguageReducer from './grant-language-reducer';
import NewsReducer from './news-reducer';
import MapReducer from './map-reducer';
import AboutReducer from './about-reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  blog: BlogReducer,
  grantLanguage: GrantLanguageReducer,
  news: NewsReducer,
  map: MapReducer,
  about: AboutReducer,
});

export default rootReducer;
