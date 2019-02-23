import React from 'react'
import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScreenOrientation } from 'expo'
import { actions } from '@store'
import AppNavigator from '@navigation/appNavigator'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
}

class App extends React.Component {
  static propTypes = propTypes

  componentDidMount = () => {
    ScreenOrientation.allowAsync('ALL')
    Dimensions.addEventListener('change', this._handleOrientationChange)
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this._handleOrientationChange)
  }

  _handleOrientationChange = ({ screen }) => {
    const { dispatch } = this.props
    dispatch(actions.ui.updateScreenDimensions(screen))
  }

  render() {
    return <AppNavigator />
  }
}

export default connect(null)(App)
