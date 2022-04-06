import React, { ReactNode } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme, { Box } from './Theme';

export const assets = [require('../../assets/images/patterns/1.png')];

const { width } = Dimensions.get('window');
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1} backgroundColor="secondary">
      <Box backgroundColor="white">
        <Box borderBottomLeftRadius="xl" overflow="hidden" height={height * 0.61}>
          <Image
            source={assets[0]}
            style={{ width, height, borderBottomLeftRadius: theme.borderRadii.xl }}
          />
        </Box>
      </Box>

      <Box flex={1} overflow="hidden">
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            top: -height * 0.61,
          }}
        />
        <Box flex={1} borderRadius="xl" borderTopLeftRadius="noRadius" backgroundColor="white">
          {children}
        </Box>
        <Box backgroundColor="secondary" paddingTop="l">
          {footer}
          <Box height={insets.bottom} />
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
