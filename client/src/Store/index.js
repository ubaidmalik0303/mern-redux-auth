import { createStore, applyMiddleware } from 'redux';
import Reducers from './Reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(Reducers, applyMiddleware(thunk, logger));

export default store;