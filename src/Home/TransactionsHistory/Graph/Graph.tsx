import React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, { divide, multiply, sub } from 'react-native-reanimated';

import { Box, useTheme } from '../../../components';
import { Theme } from '../../../components/Theme';

import Underlay, { MARGIN } from './Underlay';
import { lerp } from './Scale';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { useTransition } from 'react-native-redash';

const aspecRatio = 195 / 305;
const { width: wWidth } = Dimensions.get('window');
const AnimatedBox = Animated.createAnimatedComponent(Box);

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme['colors'];
  id: number;
}

interface GraphProps {
  data: DataPoint[];
  startDate: number;
  numberOfMonths: number;
}

const Graph = ({ data, startDate, numberOfMonths }: GraphProps) => {
  const theme = useTheme();

  const isFocused = useIsFocused();

  const transition = useTransition(isFocused, { duration: 650 });

  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspecRatio;

  const width = canvasWidth - theme.spacing[MARGIN];
  const height = canvasHeight - theme.spacing[MARGIN];

  const step = width / numberOfMonths;

  const values = data.map((p) => p.value);

  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  return (
    <Box marginTop="xl" paddingBottom={MARGIN} paddingLeft={MARGIN} flexDirection="row">
      <Underlay
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />

      <View style={{ width, height, overflow: 'hidden' }}>
        {data.map((point) => {
          const i = Math.round(
            moment.duration(moment(point.date).diff(moment(startDate))).asMonths(),
          );

          if (point.value === 0) {
            return null;
          }

          const totalHeight = lerp(0, height, point.value / maxY);
          const currenHeight = multiply(totalHeight, transition);
          const translateY = divide(sub(totalHeight, currenHeight), 2);

          return (
            <AnimatedBox
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={lerp(0, height, point.value / maxY)}
              style={{ transform: [{ translateY }, { scaleY: transition }] }}
            >
              <Box
                backgroundColor={point.color}
                opacity={0.1}
                borderTopLeftRadius="m"
                borderTopRightRadius="m"
                position="absolute"
                top={0}
                bottom={0}
                left={theme.spacing.m}
                right={theme.spacing.m}
              />
              <Box
                backgroundColor={point.color}
                position="absolute"
                top={0}
                height={32}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderRadius="m"
              />
            </AnimatedBox>
          );
        })}
      </View>
    </Box>
  );
};

export default Graph;
