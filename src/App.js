import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/login.js';
import HomeScreen from './components/home.js';
import SignupScreen from './components/signup.js';
import ChooseScreen from './components/choose.js';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Choose" component={ChooseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;