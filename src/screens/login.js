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

const Login = ({navigation}) =>{
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [password, setpassword] = useState('');

    return(
        <View style={[styles.bgLight, styles.flex1, styles.justifyCenter, {height:windowHeight}]}>
          <View style={[styles.flexCol, styles.justifyCenter, styles.alignCenter]}>
            <View style={[styles.mB4]}>
              <Avatar
                  size="xlarge"
                  rounded
                  source={require('../image/Library.png')}
                />
            </View>
            <View style={[styles.w80]}>
              <Input
                  placeholder='Email'
                />
            </View>
            <View style={[styles.w80]}>
              <PasswordInputText
                value={password}
                onChangeText={(password) => setpassword(password)}
              />
            </View>
            <View style={[styles.mT1]}>
              <TouchableOpacity style={[styles.backgroundPrimary, styles.rounded, {paddingHorizontal:30, paddingVertical:10}]}>
                <View>
                    <Text style={[styles.textWhite, styles.font16]}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.mT1]}>
              <TouchableOpacity onPress ={() => navigation.navigate('RegisterScreen')} style={[{paddingHorizontal:30, paddingVertical:10}]}>
                <View>
                    <Text style={[styles.textPrimary, styles.font16]}>Click here to Register</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
}

export default Login;