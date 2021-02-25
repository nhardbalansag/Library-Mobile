import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import PasswordInputText from 'react-native-hide-show-password-input';


import {
  styles, 
  colors
} from '../styles/styles';

import { Dimensions } from 'react-native';

import { Avatar } from 'react-native-elements';

import * as Student from '../redux/user/userActions'; 

import { 
  useDispatch,
  useSelector
} from 'react-redux';

const Login = ({navigation}) =>{
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [password, setpassword] = useState('helloworld');
  const [email, setEmail] = useState('nhardbalansag@gmail.com');

  const [loadingstate, setloadingstate] = useState(false);

  const dispatch = useDispatch();

  const login = async () =>{
    setloadingstate(true);
    try {
        await dispatch(Student.loginStudent(email, password));
        setloadingstate(false);
    } catch (error) {
        error.message == 'true' ? alertMessage("login Success") : alertMessage(error.message);
    }
  }

  const alertMessage = (message) => {
      Alert.alert(
          "Status",
          message == "login Success" ? "login Success" : "Login failed",
          message == "login Success" ? [ { text: "OKAY"}] : [ { text: "OKAY", onPress: () => setloadingstate(false)}]
      );
  }

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
                  onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={[styles.w80]}>
              <PasswordInputText
                value={password}
                onChangeText={(password) => setpassword(password)}
              />
            </View>
            <View style={[styles.mT1]}>
              <TouchableOpacity onPress = {() => login()} style={[styles.backgroundPrimary, styles.rounded, {paddingHorizontal:30, paddingVertical:10}]}>
                <View style={[styles.flexRow]}>
                    <Text style={[styles.textWhite, styles.font16]}>Login</Text>
                    {
                        loadingstate ? <ActivityIndicator style={[{marginLeft:5}]} size="small" color={colors.lightColor}/> : <></>
                    }
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