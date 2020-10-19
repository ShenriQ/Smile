import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'

// import the different screens
import Loading from './src/Loading'
import SignUp from './src/userAuth/SignUp'
import Login from './src/userAuth/Login'
import Main from './src/Main'
// create our app's navigation stack
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={Loading}
          // options={{ title: 'Loading Smile' }}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <MyStack/>
  );
};

export default App