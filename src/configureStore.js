import { applyMiddleware, compose, createStore } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';
import createReducer from '@reducers';
import sagas from './sagas';

import {createLogger} from 'redux-logger' 
const loggerMiddleware = createLogger({predicate : (getState, action) => __DEV__ });

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState = fromJS({})) {
  const middlewares = [
    sagaMiddleware, loggerMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (__DEV__) {
    enhancers.push(devTools());
  }

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  );

  // Extensions
  sagaMiddleware.run(sagas, store.dispatch);

  return store;
}

module.exports = configureStore;
