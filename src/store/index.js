import { createStore, combineReducers } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'

import uiReducer, {
  actions as uiActions,
  selectors as uiSelectors,
} from '@store/ui'

import photosReducer, {
  actions as photosActions,
  selectors as photosSelectors,
} from '@store/photos'

const rootReducer = combineReducers({
  ui: uiReducer,
  photos: photosReducer,
})

export const selectors = { ui: uiSelectors, photos: photosSelectors }
export const actions = { ui: uiActions, photos: photosActions }
export default createStore(rootReducer, devToolsEnhancer())
