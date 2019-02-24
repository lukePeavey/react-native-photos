import { PixelRatio } from 'react-native'
import { bucketURL, sizes } from '../config'

// TODO: Needs work
export default function imageURI(id, size) {
  return `${bucketURL}/${id}--${size}.jpg`
}
