import React from 'react';
import { Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPoint, clamp } from 'react-native-redash';

import { Box, useTheme } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

const { width } = Dimensions.get('window');
const height = (682 * width) / 375;
const minHeight = (228 * width) / 375;
const snapPoints = [-(height - minHeight), 0];

const Cart = ({ navigation }: HomeNavigationProps<'Cart'>) => {
  const theme = useTheme();
  const translateY = useSharedValue(0); //@ts-ignore
  const onGestureEvent = useAnimatedGestureHandler<{ y?: number }>({
    onStart: (event, ctx) => {
      //@ts-ignore
      ctx.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      //@ts-ignore
      translateY.value = clamp(ctx.y + translationY, snapPoints[0], snapPoints[1]);
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, [-(height - minHeight), 0]);
      translateY.value = withSpring(dest, { overshootClamping: true });
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Box flex={1} backgroundColor="secondary">
      <PanGestureHandler
        //@ts-ignore
        onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height,
              backgroundColor: 'white',
              borderBottomRightRadius: theme.borderRadii.xl,
              borderBottomLeftRadius: theme.borderRadii.xl,
            },
            style,
          ]}
        />
      </PanGestureHandler>
    </Box>
  );
};

export default Cart;
