import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import reducers from './state/reducers/index';
import App from './App';

const enhancers = [];
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);


const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}


const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);
const store = createStore(persistedReducer, { }, composedEnhancers);
const persistor = persistStore(store);
// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('main'),
);
