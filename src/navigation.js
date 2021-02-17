import React from 'react'

import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import AccountScreen from './screens/account';
import QRScannerScreen from './screens/qrScanner';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements'

import { 
    useSelector
  } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const loginRegister = () =>{
   return(
    <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Register' }}/>
    </Stack.Navigator>
   )
}

const Homestack = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Account' }}/>
        </Stack.Navigator>
    )
}

const Scanner = () =>{
    return(
       <QRScannerScreen/>
    )
}

const Account = () =>{
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Homestack') {
                        iconName = 'home';
                    } 
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                showIcon: true ,
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 13,
                },
                style: {
                    backgroundColor: '#fff', // Makes Android tab bar white instead of standard blue
                    height: 60,// I didn't use this in my app, so the numbers may be off. 
                    paddingBottom: 5,
                }
          }}
        >
            <Tab.Screen name="AccountScreen" component={Homestack} options={{ title: 'Student Account' }}/>
        </Tab.Navigator>
    )
}

const NavigationRoute = () =>{

    const tokenresponse = useSelector(state => state.users.Token);

    if(tokenresponse !== null){
        return Account();
    }else{
        return loginRegister();
    }

}

export default NavigationRoute;