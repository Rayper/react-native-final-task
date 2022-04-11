import { State } from 'react-native-gesture-handler';
import Animated, {
  add,
  block,
  call,
  Clock,
  cond,
  eq,
  set,
  spring,
  startClock,
  stopClock,
} from 'react-native-reanimated';
import { snapPoint, useValue } from 'react-native-redash';

interface WithSpringParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Adaptable<State>;
  snapPoints: number[];
  onSnap?: (values: readonly number[]) => void;
}

export const withSpring = ({
  value,
  velocity,
  state: gestureState,
  snapPoints,
  onSnap,
}: WithSpringParams) => {
  const offset = useValue(0);
  const clock = new Clock();
  const state = {
    position: useValue(0),
    finished: useValue(0),
    time: useValue(0),
    velocity: useValue(0),
  };

  const config = {
    toValue: useValue(0),
    damping: 6,
    mass: 1,
    stiffness: 64,
    overshootClamping: useValue(0),
    resSpeedThreshold: useValue(0.1),
    restDisplacementThreshold: useValue(0.1),
  };

  return block([
    // ketika cardnya mulai
    cond(eq(gestureState, State.BEGAN), [
      set(offset, state.position),
      stopClock(clock),
      set(state.finished, 0),
      set(state.time, 0),
    ]),
    // ketika cardnya active
    cond(eq(gestureState, State.ACTIVE), [
      set(state.position, add(offset, value)),
      set(state.velocity, velocity),
      set(config.toValue, snapPoint(state.position, state.velocity, snapPoints)),
      cond(
        eq(config.toValue, 0),
        [
          set(config.overshootClamping, 0),
          set(config.overshootClamping, 0.01),
          set(config.overshootClamping, 0.01),
        ],
        [
          // 50 speed animasinya
          set(config.overshootClamping, 1),
          set(config.overshootClamping, 50),
          set(config.overshootClamping, 50),
        ],
      ),
    ]),
    // ketika cardnya selesai
    cond(eq(gestureState, State.END), [
      startClock(clock), //@ts-ignore
      spring(clock, state, config),
      cond(state.finished, [
        //@ts-ignore
        onSnap && call([state.position], onSnap),
      ]),
    ]),
    state.position,
  ]);
};
