import React from 'react'

import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


const loginRegister = () =>{
   return(
    <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Register' }}/>
    </Stack.Navigator>
   )
}

const NavigationRoute = () =>{

    return loginRegister();

}

export default NavigationRoute;