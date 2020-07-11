import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './state/reducers/index';
import App from './App';

// boostrap stylesheet

import 'bootstrap/dist/css/bootstrap.min.css';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));
// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { createStore, applyMiddleware, compose } from 'redux';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// import thunk from 'redux-thunk';
// import { PersistGate } from 'redux-persist/integration/react';
// import reducers from './state/reducers/index';
// import App from './App';


// const enhancers = [];
// const middleware = [thunk];

// // all of this persisting stuff is so that the redux state does not clear/refresh on reload.

// const persistConfig = {
//   key: 'root',
//   storage,
//   stateReconciler: autoMergeLevel2,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);


// const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

// if (typeof devToolsExtension === 'function') {
//   enhancers.push(devToolsExtension());
// }


// const composedEnhancers = compose(
//   applyMiddleware(...middleware),
//   ...enhancers,
// );

// const store = createStore(persistedReducer, { }, composedEnhancers);
// const persistor = persistStore(store);
// // we now wrap App in a Provider
// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>,
//   document.getElementById('main'),
// );
