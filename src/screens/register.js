import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'

import { Input } from 'react-native-elements';

import PasswordInputText from 'react-native-hide-show-password-input';

import {styles} from '../styles/styles'

import { Dimensions } from 'react-native';

const Register = ({navigation}) =>{

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [middlename, setmiddlename] = useState('');
    const [IdNumber, setIdNumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const registerInput = () =>{
        return(
            <View style={[styles.bgLight, styles.flex1, styles.justifyCenter, {height:windowHeight}]}>
                <View style={[styles.flexCol, styles.justifyCenter, styles.alignCenter]}>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='First name'
                            />
                    </View>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='Last name'
                            />
                    </View>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='Middle name'
                            />
                    </View>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='ID number'
                            />
                    </View>
                    <View style={[styles.w90]}>
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
                                <Text style={[styles.textWhite, styles.font16]}>Register</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.mT1]}>
                        <TouchableOpacity onPress ={() => navigation.navigate('LoginScreen')} style={[{paddingHorizontal:30, paddingVertical:10}]}>
                            <View>
                                <Text style={[styles.textPrimary, styles.font16]}>Click here to Login Account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <FlatList 
            ListHeaderComponent={registerInput}
        />
    )
}

export default Register;