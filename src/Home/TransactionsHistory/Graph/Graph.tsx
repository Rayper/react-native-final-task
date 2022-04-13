import React from 'react';
import { Dimensions } from 'react-native';

import { Box, useTheme } from '../../../components';
import { Theme } from '../../../components/Theme';

import Underlay, { MARGIN } from './Underlay';
import { lerp } from './Scale';
import moment from 'moment';

const aspecRatio = 195 / 305;
const { width: wWidth } = Dimensions.get('window');

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

  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspecRatio;

  const width = canvasWidth - theme.spacing[MARGIN];
  const height = canvasHeight - theme.spacing[MARGIN];

  const values = data.map((p) => p.value);
  const dates = data.map((p) => p.date);

  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const step = width / numberOfMonths;

  return (
    <Box marginTop="xl" paddingBottom={MARGIN} paddingLeft={MARGIN}>
      <Underlay
        dates={dates}
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />
      <Box width={width} height={height}>
        {data.map((point) => {
          const i = Math.round(
            moment.duration(moment(point.date).diff(moment(startDate))).asMonths(),
          );
          // jika data-nya gak ada
          if (point.value === 0) {
            return null;
          }

          return (
            <Box
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={lerp(0, height, point.value / maxY)}
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
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Graph;
