import React from 'react'
import { View } from 'react-native'

export default function Snake(props) {
    return (
        <View>
            {props.snakeDots.map((dot, i) => {
                return (<View 
                    key={i} 
                    style={{
                        position: 'absolute',
                        borderWidth: 0.5, 
                        borderColor:  '#fff',
                        width: props.size,
                        height: props.size,
                        backgroundColor : '#000103',
                        left: dot[0]*props.size,
                        top: dot[1]*props.size
                    }}
                    />)
            })}
        </View>
    )
}

