import React from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface DotProps {
  index: number;
  currentIndex: Animated.SharedValue<number>;
}

const Dot = ({ index, currentIndex }: DotProps) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentIndex.value,
      // mindahin index untuk tau lagi diposisi mana
      [index - 1, index, index + 1],
      // level opacity-nya
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      currentIndex.value,
      // mindahin index untuk tau lagi diposisi mana
      [index - 1, index, index + 1],
      // level opacity-nya
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      backgroundColor: '#2CB9B0',
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 4,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={style} />;
};

export default Dot;
