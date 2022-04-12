import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Text, useTheme } from '../../../components';

import 'intl';
import 'intl/locale-data/jsonp/en';

interface UnderlayProps {
  dates: number[];
  minY: number;
  maxY: number;
  step: number;
}

const formatter = Intl.DateTimeFormat('en', { month: 'short' });

const Underlay = ({ dates, minY, maxY, step }: UnderlayProps) => {
  const theme = useTheme();

  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} />
      <Box marginLeft="l" height={theme.spacing.l} flexDirection="row">
        {dates.map((date, index) => (
          <Box width={step}>
            <Text key={index} color="darkGrey" textAlign='center'>
              {formatter.format(new Date(date))}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
