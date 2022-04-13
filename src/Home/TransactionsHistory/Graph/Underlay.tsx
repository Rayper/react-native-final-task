import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Text, useTheme } from '../../../components';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { lerp } from './Scale';
import moment from 'moment';

interface UnderlayProps {
  dates: number[];
  minY: number;
  maxY: number;
  startDate: number;
  numberOfMonths: number;
  step: number;
}

export const MARGIN = 'xl';
const ROW_HEIGHT = 16;
// const formatter = (date: Date) => format(date, 'MMM');

const Underlay = ({ dates, minY, maxY, startDate, numberOfMonths, step }: UnderlayProps) => {
  const minDate = moment(startDate);
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
              <Box flex={1} height={1} backgroundColor="darkGrey" />
            </Box>
          );
        })}
      </Box>
      <Box marginLeft={MARGIN} height={theme.spacing[MARGIN]} flexDirection="row">
        {new Array(numberOfMonths)
          .fill(0)
          .map((_, i) => minDate.clone().add(i, 'month'))
          .map((date, index) => (
            <Box width={step} key={index}>
              <Text textAlign="center">{date.format('MMM')}</Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Underlay;
