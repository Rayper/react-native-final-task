import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Box, useTheme } from '../../components';

const Background = () => {
  const theme = useTheme();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Box flex={1 / 3} backgroundColor="secondary">
        <Box flex={1} backgroundColor="white" borderBottomRightRadius="xl" />
      </Box>
      <Box flex={1 / 3}>
        <Box flex={1} backgroundColor="white" />
        <Box flex={1} backgroundColor="outfirIdeasFooter" />
        <Image
          source={require('../../../assets/images/patterns/drawer.jpg')}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
            borderTopLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
      <Box flex={1 / 3} backgroundColor="secondary">
        <Box flex={1} backgroundColor="outfirIdeasFooter" borderTopLeftRadius="xl" />
      </Box>
    </View>
  );
};

export default Background;
