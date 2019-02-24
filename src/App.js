import React from 'react'
import { Dimensions, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScreenOrientation } from 'expo'
import { selectors, actions } from '@store'
import AppNavigator from '@navigation/appNavigator'
import { ScreenPropType } from './types'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  screen: ScreenPropType,
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
    return (
      <React.Fragment>
        <StatusBar hidden={this.props.screen.isLandscape} />
        <AppNavigator />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  screen: selectors.ui.getScreen(state),
})

export default connect(mapStateToProps)(App)
