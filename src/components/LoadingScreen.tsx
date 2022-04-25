import React from 'react';
import { ActivityIndicator, Image } from 'react-native';

import { Box, Text } from './Theme';

const loadingLogo = require('../../assets/images/loadingLogo.png');

const LoadingScreen = () => {
  return (
    <Box style={{ marginTop: 150 }}>
      <Box justifyContent="center" alignItems="center">
        <Text textAlign="center" padding="s" variant="title1" style={{ color: '#160029' }}>
          Please wait
        </Text>
        <Image source={loadingLogo} style={{ width: 30, height: 50 }} />
      </Box>
      <Box marginVertical="m">
        <ActivityIndicator size="large" animating={true} color="#0C0D34" />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
