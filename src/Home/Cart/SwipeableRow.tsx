import React, { ReactNode, useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

import { LinearGradient } from 'expo-linear-gradient';

import { RoundedIconButton, useTheme, Text } from '../../components';
import { aspectRatio, Box, width } from '../../components/Theme';

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
  height: number;
}

const finalDestination = width;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipeableRow = ({ children, onDelete, height: defaultHeight }: SwipeableRowProps) => {
  const height = useSharedValue(defaultHeight);

  const theme = useTheme();
  const translateX = useSharedValue(0);

  const deleteItem = useCallback(() => {
    onDelete();
  }, [onDelete]);

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
            height.value = withTiming(0, { duration: 250 });
            runOnJS(deleteItem)();
            translateX.value = 0;
          }
        },
      );
    },
  });

  const style = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: theme.colors.white,
    transform: [{ translateX: translateX.value }],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.danger, theme.colors.white]}
          start={[0, 0.5]}
          end={[1, 0.5]}
        />
        <Box padding="m" width={editWidth} justifyContent="space-evenly" flex={1}>
          <Text variant="title3" style={{ color: 'white' }}>
            Remove
          </Text>
        </Box>
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, editStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.lightBlue, theme.colors.white]}
          start={[1, 0.5]}
          end={[0.7, 0.5]}
        />
        <Box
          justifyContent="space-evenly"
          width={editWidth}
          alignSelf="flex-end"
          alignItems="center"
          flex={1}
        >
          <RoundedIconButton
            onPress={() => alert('plus!')}
            name="plus"
            size={24}
            color="white"
            backgroundColor="primary"
            iconRatio={0.5}
          />

          <RoundedIconButton
            onPress={() => alert('minus!')}
            name="minus"
            size={24}
            color="white"
            backgroundColor="danger"
            iconRatio={0.5}
          />
        </Box>
      </Animated.View>
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
