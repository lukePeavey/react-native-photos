/* eslint-disable no-undef */
import React from 'react'
import { KeepAwake, registerRootComponent } from 'expo'
import { Provider } from 'react-redux'
import store from '@store'
import App from './App'

// This is the main entry point for the app
// -----------------------------------------

if (__DEV__) {
  KeepAwake.activate()
}

// Renders the App component with redux state
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

registerRootComponent(Root)
