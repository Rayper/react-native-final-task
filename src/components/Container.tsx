import React, { ReactNode } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, useTheme } from './Theme';

export const assets = [
  require('../../assets/images/patterns/1.png'),
  require('../../assets/images/patterns/2.png'),
  require('../../assets/images/patterns/3.png'),
] as const;

const { width } = Dimensions.get('window');
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
  pattern: 0 | 1 | 2;
}

const Container = ({ children, footer, pattern }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const asset = assets[pattern];

  return (
    <Box flex={1} backgroundColor="secondary">
      <Box backgroundColor="white">
        <Box borderBottomLeftRadius="xl" overflow="hidden" height={height * 0.61}>
          <Image
            source={asset}
            style={{ width, height, borderBottomLeftRadius: theme.borderRadii.xl }}
          />
        </Box>
      </Box>

      <Box flex={1} overflow="hidden">
        <Image
          source={asset}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            top: -height * 0.61,
          }}
        />
        <Box flex={1} borderRadius="xl" borderTopLeftRadius="noRadius" backgroundColor="white">
          <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
        </Box>
      </Box>

      <Box backgroundColor="secondary" paddingTop="l">
        {footer}
        <Box height={insets.bottom} />
      </Box>
    </Box>
  );
};

export default Container;
