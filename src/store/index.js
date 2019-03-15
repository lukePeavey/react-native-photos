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
import geolocationsReducer, {
  actions as geolocationsActions,
  selectors as geolocationsSelectors,
} from '@store/geolocations'

const middleware = [thunk]

const persistConfig = {
  storage,
  key: `photos_v0.1`,
  blacklist: ['ui'],
}

const rootReducer = combineReducers({
  ui: uiReducer,
  photos: photosReducer,
  geolocations: geolocationsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux store
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
export const persistor = persistStore(store)

// Export action creators and selectors
export const selectors = {
  ui: uiSelectors,
  photos: photosSelectors,
  geolocations: geolocationsSelectors,
}
export const actions = {
  ui: uiActions,
  photos: photosActions,
  geolocations: geolocationsActions,
}
