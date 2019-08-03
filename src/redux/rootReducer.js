import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './userReducer'
import entryReducer from './entryReducer'
import xpReducer from './scoresReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['entry']
}

const rootReducer = combineReducers({
    user: userReducer,
    entry: entryReducer
})

export default persistReducer(persistConfig, rootReducer)