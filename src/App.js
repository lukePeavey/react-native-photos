/* eslint-disable camelcase */
import React from 'react'
import { Dimensions, StatusBar, CameraRoll } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScreenOrientation, Permissions } from 'expo'
import { selectors, actions } from '@store'
import AppNavigator from '@navigation/appNavigator'
import console from '@utils/console'
import { ScreenPropType } from './types'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  screen: ScreenPropType,
}

class App extends React.Component {
  static propTypes = propTypes

  async componentDidMount() {
    ScreenOrientation.allowAsync('ALL')
    Dimensions.addEventListener('change', this._handleOrientationChange)
    this._getPhotosFromCameraRoll()
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this._handleOrientationChange)
  }

  _handleOrientationChange = ({ screen }) => {
    const { dispatch } = this.props
    dispatch(actions.ui.updateScreenDimensions(screen))
  }

  _requestCameraRollPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      return status
    } catch (error) {
      return 'denied'
    }
  }

  /**
   * Get data from the devices cameral roll and store it an application state
   */
  _getPhotosFromCameraRoll = async () => {
    const { dispatch } = this.props
    const permissionStatus = await this._requestCameraRollPermission()
    if (permissionStatus === 'granted') {
      // Get all photos/videos from cameral roll
      const data = await CameraRoll.getPhotos({
        first: 500,
        assetType: 'Photos',
      })
      // Transform the data into an object map in which they keys are item IDs
      // and values are the corresponding item.
      const photos = data.edges.reduce((result, { node }) => {
        const { group_name, timestamp, ...rest } = node
        const item = {
          id: rest.image.filename,
          groupName: group_name,
          timestamp: timestamp * 1000,
          ...rest,
        }
        return { ...result, [item.id]: item }
      }, {})
      // Save photos to redux state
      dispatch(actions.photos.savePhotos(photos))
      dispatch(actions.geolocations.reverseGeocodeImageLocations())
    }
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
