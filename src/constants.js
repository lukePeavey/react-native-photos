/* eslint-disable import/prefer-default-export */
import { Platform } from 'react-native'

export const IS_TABLET = Platform.OS === 'ios' && Platform.isPad
