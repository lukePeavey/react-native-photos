/* eslint-disable no-undef */
import React from 'react'
import { KeepAwake, registerRootComponent } from 'expo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@store'
import App from './App'

// This is the main entry point for the app
// -----------------------------------------

if (__DEV__) {
  KeepAwake.activate()
}

// Renders the App component with redux state
const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

registerRootComponent(Root)
