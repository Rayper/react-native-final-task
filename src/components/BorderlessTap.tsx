import React, { ReactNode } from 'react';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  call,
  eq,
  useCode,
  cond,
  startClock,
  stopClock,
  set,
  greaterThan,
  add,
  and,
  clockRunning,
  not,
  neq,
} from 'react-native-reanimated';
import { useClock, useTapGestureHandler, useValue } from 'react-native-redash';

interface BorderlessTapProps {
  onPress: () => void;
  children: ReactNode;
}

const BorderlessTap = ({ children, onPress }: BorderlessTapProps) => {
  const { gestureHandler, state } = useTapGestureHandler();

  const clock = useClock();

  const start = useValue(0);

  const opacity = useValue(0);

  useCode(
    () => [
      // ketika category di klik kondisi sebelumnya belum di klik
      cond(and(not(clockRunning(clock)), eq(state, State.BEGAN)), [
        startClock(clock),
        set(start, clock),
      ]),
      // ketika category di klik
      cond(neq(state, State.BEGAN), stopClock(clock)),
      // ketika category di klik kembali
      cond(eq(state, State.END), [call([], onPress), stopClock(clock)]),
      set(opacity, cond(and(greaterThan(clock, add(start, 100)), clockRunning(clock)), 0.5, 1)),
    ],
    [],
  );

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={{ opacity }}>{children}</Animated.View>
    </TapGestureHandler>
  );
};

export default BorderlessTap;
