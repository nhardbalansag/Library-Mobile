import React, {useState} from 'react'
import {
    View,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import PasswordInputText from 'react-native-hide-show-password-input';

const Login = ({navigation}) =>{


  const [password, setpassword] = useState('');

    return(
        <View>
          <Input
            placeholder='Email'
            leftIcon={
              <Icon
                name='envelope'
                size={24}
                color='black'
              />
            }
          />

              <PasswordInputText
                    // style={styles.inputForm}
                    value={password}
                    onChangeText={(password) => setpassword(password)}
                />
        </View>
    );
}

export default Login;