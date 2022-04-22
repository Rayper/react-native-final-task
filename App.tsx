import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as React from 'react';

import { assets as authenticationAssets, AuthenticationNavigator } from './src/Authentication';
import { LoadAssets } from './src/components';
import { ThemeProvider } from './src/components/Theme';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator, assets as HomeAssets } from './src/Home';
import { AppRoutes } from './src/components/Navigation';
import axios from 'axios';
import { AuthContextProvider } from './src/context/Authentication/AuthContext';

axios.defaults.baseURL = 'http://192.168.1.13:8000/api/';

const assets = [...authenticationAssets, ...HomeAssets];

const fonts = {
  "SF-Pro-Display-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SF-Pro-Display-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SF-Pro-Display-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SF-Pro-Display-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
    

    return (
      <ThemeProvider>
        <LoadAssets {...{ fonts, assets }}>
          <AuthContextProvider>
            <SafeAreaProvider>
              <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Authentication" component={AuthenticationNavigator} />
                <AppStack.Screen name="Home" component={HomeNavigator} />
              </AppStack.Navigator>
            </SafeAreaProvider>
          </AuthContextProvider>  
        </LoadAssets>
      </ThemeProvider>
      
    );
};