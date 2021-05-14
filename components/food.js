import React from 'react'
import { View } from 'react-native'

export default (props) => {
    return (
        <View style={{
        position: 'absolute',
        borderWidth: 0.5, 
        borderColor:  '#fff',
        width: props.size,
        height: props.size,
        backgroundColor : 'red',
        left: props.dot[0]*props.size,
        top: props.dot[1]*props.size
        }}
        />
    )
}