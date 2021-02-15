import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import PasswordInputText from 'react-native-hide-show-password-input';

import {styles} from '../styles/styles'

import { Dimensions } from 'react-native';

import { Avatar } from 'react-native-elements';

const Account = ({navigation}) =>{
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

    return(
        <View style={[styles.bgLight, styles.flex1, styles.justifyCenter, {height:windowHeight}]}>
            <Text>Account</Text>
        </View>
    );
}

export default Account;