import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';

import { OnBoarding, Welcome } from './src/Authentication';
import { LoadAssets, theme } from './src/components';



const AuthenticationStack = createStackNavigator();

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const AuthenticationNavigator = () => {
  return (
      <AuthenticationStack.Navigator screenOptions={{ 
        headerShown: false
      }}>
      <AuthenticationStack.Screen name='OnBoarding' component={OnBoarding}/>
      <AuthenticationStack.Screen name='Welcome' component={Welcome}/>
      </AuthenticationStack.Navigator>
  );
};

export default function App() {
    return (
      <ThemeProvider {...{ theme }}>
        <LoadAssets {...{ fonts }}>
        <AuthenticationNavigator/>
        </LoadAssets>
      </ThemeProvider>
      
    );
};