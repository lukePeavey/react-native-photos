import React from 'react'
import PropTypes from 'prop-types'
import { ColorPropType } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const propTypes = {
  tintColor: ColorPropType.isRequired,
  name: PropTypes.string.isRequired,
}

/**
 * Component that render icon in bottom tab bar
 */
export default function TabBarIcon({ tintColor, ...rest }) {
  return <Ionicons size={25} color={tintColor} {...rest} />
}

TabBarIcon.propTypes = propTypes
