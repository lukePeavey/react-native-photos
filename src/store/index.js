import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import uiReducer, {
  actions as uiActions,
  selectors as uiSelectors,
} from '@store/ui'
import photosReducer, {
  actions as photosActions,
  selectors as photosSelectors,
} from '@store/photos'

const middleware = [thunk]

const persistConfig = {
  storage,
  key: `photos_v10003`,
  blacklist: ['ui'],
}

const rootReducer = combineReducers({
  ui: uiReducer,
  photos: photosReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux store
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
export const persistor = persistStore(store)
export const selectors = { ui: uiSelectors, photos: photosSelectors }
export const actions = { ui: uiActions, photos: photosActions }
