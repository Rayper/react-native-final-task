import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { useTheme } from '../../components';
import { aspectRatio, width } from '../../components/Theme';

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
}

const finalDestination = width;
const snapPoints = [-85 * aspectRatio, 0, finalDestination];

const SwipeableRow = ({ children, onDelete }: SwipeableRowProps) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  //@ts-ignore
  const onGestureEvent = useAnimatedGestureHandler<{ x: number }>({
    onStart: (_, ctx) => {
      //@ts-ignore
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      //@ts-ignore
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const destination = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        destination,
        {
          // tingkat bounciness animationya
          overshootClamping: true,
        },
        () => {
          if (destination === finalDestination) {
            onDelete();
          }
        },
      );
    },
  });

  const style = useAnimatedStyle(() => ({
    backgroundColor: theme.colors.white,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View>
      <View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#BFEAF5'}}
      />
      <PanGestureHandler
        //@ts-ignore
        onGestureEvent={onGestureEvent}
      >
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
