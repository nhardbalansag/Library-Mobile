import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'

import { Input } from 'react-native-elements';

import PasswordInputText from 'react-native-hide-show-password-input';

import {
    styles, 
    colors
} from '../styles/styles';

import { Dimensions } from 'react-native';

import {APP_LINK} from '../config'

const Register = ({navigation}) =>{

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  
    const [first_name, setfirstname] = useState('');
    const [last_name, setlastname] = useState('');
    const [middle_name, setmiddlename] = useState('');
    const [id_number, setIdNumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [loadingstate, setloadingstate] = useState(false);

    const registerStudent = async () => {
        setloadingstate(true)
        try {
            const response  = await fetch(APP_LINK + 'register-student', {
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    first_name, 
                    last_name,
                    middle_name,
                    id_number,
                    email,
                    password
                })
            }); 

            const responseData = await response.json();
            alertMessage(responseData.status)
        } catch (error) {
            ErrorMessage(error.message)
        }
        setloadingstate(false)
    }

    const ErrorMessage = (message) => {
        Alert.alert(
            "Status",
            message,
            [ { text: "OKAY", onPress: () => setloadingstate(false)}]
        );
    }
    
    const alertMessage = (message) => {
        Alert.alert(
            "Status",
            message? "Registration Success, Please Login" : "Registration failed",
            message? [ { text: "OKAY"}] : [ { text: "OKAY", onPress: () => setloadingstate(false)}]
        );
    }

    const registerInput = () =>{
        return(
            <View style={[styles.bgLight, styles.flex1, styles.justifyCenter, {height:windowHeight}]}>
                <View style={[styles.flexCol, styles.justifyCenter, styles.alignCenter]}>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='First name'
                            onChangeText={(text) => setfirstname(text)}
                            />
                    </View>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='Last name'
                            onChangeText={(text) => setlastname(text)}
                            />
                    </View>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='Middle name'
                            onChangeText={(text) => setmiddlename(text)}
                            />
                    </View>
                    <View style={[styles.w90]}>
                        <Input
                            placeholder='ID number'
                            onChangeText={(text) => setIdNumber(text)}
                            />
                    </View>
                    <View style={[styles.w90]}>
                    <Input
                        placeholder='Email'
                        onChangeText={(text) => setemail(text)}
                        />
                    </View>
                    <View style={[styles.w80]}>
                        <PasswordInputText
                            value={password}
                            onChangeText={(password) => setpassword(password)}
                        />
                    </View>
                    <View style={[styles.mT1]}>
                        <TouchableOpacity onPress={() => registerStudent()} style={[styles.backgroundPrimary, styles.rounded, {paddingHorizontal:30, paddingVertical:10}]}>
                            <View style={[styles.flexRow]}>
                                <Text style={[styles.textWhite, styles.font16]}>Register</Text>
                                {
                                    loadingstate ? <ActivityIndicator style={[{marginLeft:5}]} size="small" color={colors.lightColor}/> : <></>
                                }
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