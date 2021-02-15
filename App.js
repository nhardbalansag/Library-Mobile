/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import SplashScreen from './src/screens/splash';
import NavigationRoute from './src/navigation/';

import UserReducer  from './src/redux/user/userReducer'

const rootReducer = combineReducers({
  users:UserReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 

// const App: () => React$Node = () => {
const App = () =>{

  const [load, setload] = useState(false);

  const loadScreen = () =>{
    setTimeout(
      () =>{
        setload(true);
      }, 3000);
      setload(false);
  }

  useEffect(() =>{
    loadScreen()
  },[])

  return (
    <>
      {
        !load 
        ?
          <>
            <SplashScreen/>
          </>
        :
          <>
            <Provider store={store}>
              <StatusBar barStyle="dark-content" />
              <NavigationContainer>
                <NavigationRoute/>
              </NavigationContainer>
            </Provider>
          </>
      }
    </>
  );
};

export default App;
