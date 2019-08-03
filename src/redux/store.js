import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import entryReducer from './entryReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'

// const rootReducer = combineReducers({
//   user: userReducer,
//   entry: entryReducer
// });





export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))

export const persistor = persistStore(store)

// export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));

export default { store, persistor }