import React from 'react';
import { Dimensions } from 'react-native';

import { Box, useTheme } from '../../../components';
import { Theme } from '../../../components/Theme';

import Underlay from './Underlay';

const aspecRatio = 195 / 305;
const { width: wWidth } = Dimensions.get('window');
const lerp = (v0: number, v1: number, t: number) => {
  return (1 - t) * v0 + t * v1;
};

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme['colors'];
}

interface GraphProps {
  data: DataPoint[];
}

const Graph = ({ data }: GraphProps) => {
  const theme = useTheme();
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspecRatio;
  const width = canvasWidth - theme.spacing.l;
  const height = canvasHeight - theme.spacing.l;
  const values = data.map((p) => p.value);
  const dates = data.map((p) => p.date);
  const step = width / data.length;
  // const minX = Math.min(...dates);
  // const maxX = Math.max(...dates);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  return (
    <Box marginTop="xl" paddingBottom="l" paddingLeft="l">
      <Underlay minY={minY} maxY={maxY} dates={dates} step={step}/>
      <Box width={width} height={height}>
        {data.map((point, i) => {
          // jika valuenya 0
          if (point.value === 0) {
            return null;
          }
          const step = width / data.length;
          return (
            <Box
              key={point.date}
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
