import React from 'react';
import { Dimensions, ImageRequireSource, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { mix, mixColor, snapPoint } from 'react-native-redash';

import { Box } from '../../components';

interface CardProps {
  onSwipe: () => void;
  source: ImageRequireSource;
  step: number;
  index: number;
  aIndex: Animated.SharedValue<number>;
}

const { width: wWidth } = Dimensions.get('window');
const width = wWidth * 0.75;
const height = width * (425 / 294);
const borderRadius = 24;
const snapPoints = [-wWidth, 0, wWidth];

const Card = ({ onSwipe, source, step, index, aIndex }: CardProps) => {
  const position = useDerivedValue(() => index * step - aIndex.value);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  // const backgroundStyle = useAnimatedStyle(() => ({
  //   backgroundColor: mixColor(position.value, '#463179', '#1563a5'),
  // }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(position.value, [0, step], [1.2, 1], Extrapolate.CLAMP),
      },
    ],
  }));

  //@ts-ignore
  const onGestureEvent = useAnimatedGestureHandler<{ x: number; y: number }>({
    onStart: (_, ctx) => {
      //@ts-ignore
      ctx.x = translateX.value;
      //@ts-ignore
      ctx.y = translateYOffset;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      //@ts-ignore
      translateX.value = translationX + ctx.x;
      //@ts-ignore
      translateY.value = translationY + ctx.y;
    },
    onEnd: ({ velocityX, velocityY }) => {
      // translateY.value = withSpring(0, {
      //   velocity: velocityY,
      // });

      const destination = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        destination,
        {
          overshootClamping: destination === 0 ? false : true,
          restSpeedThreshold: destination === 0 ? 0.01 : 100,
          restDisplacementThreshold: destination === 0 ? 0.01 : 100,
        },
        () => destination !== 0 && runOnJS(onSwipe)(),
      );
    },
  });

  const translateYOffset = mix(position.value, 0, -75);

  const cardStyle = useAnimatedStyle(() => {
    const scale = mix(position.value, 1, 0.9);

    return {
      transform: [{ translateY: translateYOffset }, { translateX: translateX.value }, { scale }],
      backgroundColor: mixColor(position.value, '#C9E9E7', '#74BCBE'),
    };
  });

  return (
    <Box style={StyleSheet.absoluteFill} justifyContent="center" alignItems="center">
      <PanGestureHandler
        //@ts-ignore
        onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            {
              width,
              height,
              borderRadius,
              overflow: 'hidden',
            },
            cardStyle,
          ]}
        >
          <Animated.Image
            {...{ source }}
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined,
              },
              imageStyle,
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
