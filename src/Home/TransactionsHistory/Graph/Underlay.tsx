import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Text, useTheme } from '../../../components';

import { format } from 'date-fns';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { lerp } from './Scale';

interface UnderlayProps {
  dates: number[];
  minY: number;
  maxY: number;
  step: number;
}

export const MARGIN = 'xl';
const ROW_HEIGHT = 16;
const formatter = (date: Date) => format(date, 'MMM');

const Underlay = ({ dates, minY, maxY, step }: UnderlayProps) => {
  const theme = useTheme();

  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} justifyContent="space-between">
        {[1, 0.66, 0.33, 0].map((t) => {
          return (
            <Box
              key={t}
              flexDirection="row"
              alignItems="center"
              height={ROW_HEIGHT}
              style={{ zIndex: 999, top: t === 0 ? 8 : t === 1 ? -8 : 0 }}
            >
              <Box width={theme.spacing[MARGIN]} paddingRight="s">
                <Text color="darkGrey" textAlign="right">
                  {Math.round(lerp(minY, maxY, t))}
                </Text>
              </Box>
              <Box flex={1} height={1} backgroundColor="grey" />
            </Box>
          );
        })}
      </Box>
      <Box marginLeft={MARGIN} height={theme.spacing[MARGIN]} flexDirection="row">
        {dates.map((date, index) => (
          <Box width={step}>
            <Text key={index} textAlign="center">
              {formatter(new Date(date))}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
