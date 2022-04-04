import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnBoarding } from './src/Authentication';
import { LoadAssets } from './src/components';

const AuthenticationStack = createStackNavigator();

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const AuthenticationNavigator = () => {
  return (
      <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen name='OnBoarding' component={OnBoarding}/>
      </AuthenticationStack.Navigator>
  );
};

export default function App() {
    return (
      <LoadAssets {...{ fonts }}>
        <AuthenticationNavigator/>
      </LoadAssets>
    );
};