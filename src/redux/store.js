import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import entryReducer from './entryReducer'

const rootReducer = combineReducers({
  user: userReducer,
  entry: entryReducer
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)

));