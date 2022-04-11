import React from 'react';
import { Dimensions, Image, ImageRequireSource, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { add, Extrapolate, interpolate } from 'react-native-reanimated';
import { mix, mixColor, step, usePanGestureHandler } from 'react-native-redash';

import { Box } from '../../components';

import { withSpring } from './Animations';

interface CardProps {
  position: Animated.Node<number>;
  onSwipe: () => void;
  source: ImageRequireSource;
  step: number;
}

const { width: wWidth } = Dimensions.get('window');
const width = wWidth * 0.75;
const height = width * (425 / 294);
const borderRadius = 24;

const Card = ({ position, onSwipe, source, step }: CardProps) => {
  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();

  const backgroundColor = mixColor(position, '#463179', '#1563a5');

  const translateYOffset = mix(position, 0, -75);

  const translateY = add(
    translateYOffset,
    withSpring({
      value: translation.y,
      velocity: velocity.y,
      state,
      snapPoints: [0],
    }),
  );

  const scale = mix(position, 1, 0.9);

  const imageScale = interpolate(position, {
    inputRange: [0, step],
    outputRange: [1, 0.8],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateX = withSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-wWidth, 0, wWidth],
    // supaya balik lg ke belakang setelah di swipe
    onSnap: ([x]) => x !== 0 && onSwipe(),
  });

  return (
    <Box style={StyleSheet.absoluteFillObject} justifyContent="center" alignItems="center">
      <PanGestureHandler {...gestureHandler}>
        <Animated.View //@ts-config
          style={{
            backgroundColor,
            width,
            height,
            borderRadius,
            transform: [{ translateY }, { translateX }, { scale }],
            overflow: 'hidden',
          }}
        >
          <Animated.Image
            {...{ source }}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
              transform: [{ scale: imageScale }],
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
