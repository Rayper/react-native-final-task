import 'react-native-gesture-handler';
import * as React from 'react';

import { ThemeProvider } from '@shopify/restyle';

import { assets as authenticationAssets, AuthenticationNavigator } from './src/Authentication';
import { LoadAssets, theme } from './src/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const assets = [...authenticationAssets];

const fonts = {
  "SF-Pro-Display-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SF-Pro-Display-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SF-Pro-Display-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SF-Pro-Display-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

export default function App() {
    return (
      <ThemeProvider {...{ theme, assets }}>
        <LoadAssets {...{ fonts }}>
          <SafeAreaProvider>
            <AuthenticationNavigator/>
          </SafeAreaProvider>  
        </LoadAssets>
      </ThemeProvider>
      
    );
};