import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import {styles} from '../styles/styles'

const Button = (props) =>{
    return(
        <View>
            <TouchableOpacity style={[styles.backgroundPrimary, styles.rounded, {paddingHorizontal:30, paddingVertical:10}]}>
                <View>
                    <Text style={[styles.textWhite, styles.font16]}>Login</Text>
                </View>
              </TouchableOpacity>
        </View>
    )
}

export default Button;