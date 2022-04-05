import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeProvider } from '@shopify/restyle';

import { Onboarding, Welcome, assets as authenticationAssets} from './src/Authentication';
import { LoadAssets, theme } from './src/components';
import { Routes } from './src/components/Navigation';

const assets = [...authenticationAssets];

const fonts = {
  "SF-Pro-Display-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SF-Pro-Display-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SF-Pro-Display-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SF-Pro-Display-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

const AuthenticationStack = createStackNavigator<Routes>();

const AuthenticationNavigator = () => {
  return (
      <AuthenticationStack.Navigator screenOptions={{ 
        headerShown: false
      }}>
      <AuthenticationStack.Screen name='Onboarding' component={Onboarding}/>
      <AuthenticationStack.Screen name='Welcome' component={Welcome}/>
      </AuthenticationStack.Navigator>
  );
};

export default function App() {
    return (
      <ThemeProvider {...{ theme, assets }}>
        <LoadAssets {...{ fonts }}>
        <AuthenticationNavigator/>
        </LoadAssets>
      </ThemeProvider>
      
    );
};