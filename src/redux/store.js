import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore } from 'redux-persist'
import rootReducer from './rootReducer'

// const rootReducer = combineReducers({
//   user: userReducer,
//   entry: entryReducer
// });





export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))

export const persistor = persistStore(store)

// export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));

export default { store, persistor }