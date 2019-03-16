/* eslint-disable react/prop-types */
import React from 'react'
import { TouchableWithoutFeedback, Image, View } from 'react-native'

export default function PhotoGridItem({
  item,
  onPress,
  size,
  style,
  ...imageProps
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} key={item.id}>
      <Image
        source={{ uri: item.image.uri }}
        style={[style, size]}
        {...imageProps}
      />
    </TouchableWithoutFeedback>
  )
}
