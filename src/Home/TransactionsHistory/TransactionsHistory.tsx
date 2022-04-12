import React from 'react';

import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

import Graph, { DataPoint } from './Graph';

const data: DataPoint[] = [
  {
    date: new Date('2021-05-10').getTime(),
    value: 139.42,
    color: 'primary',
  },
  {
    date: new Date('2021-06-10').getTime(),
    value: 199.42,
    color: 'yellow',
  },
  {
    date: new Date('2021-07-10').getTime(),
    value: 281.23,
    color: 'orange',
  },
  {
    date: new Date('2021-08-10').getTime(),
    value: 250.08,
    color: 'violet',
  },
  {
    date: new Date('2021-09-10').getTime(),
    value: 158.54,
    color: 'pink',
  },
  {
    date: new Date('2021-10-10').getTime(),
    value: 0,
    color: 'yellow',
  },
];

const TransactionsHistory = ({ navigation }: HomeNavigationProps<'TransactionsHistory'>) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        tittle="Transactions History"
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        right={{ icon: 'share', onPress: () => true }}
      />
      <Box padding="m">
        <Box flexDirection="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Text variant="Header" color="secondary" opacity={0.3}>
              TOTAL SPENT
            </Text>
            <Text variant="title1">10.000.000 IDR</Text>
          </Box>
          <Box backgroundColor="primaryLight" borderRadius="l" padding="m">
            <Text color="primary">All Time</Text>
          </Box>
        </Box>
        <Graph data={data} />
      </Box>
    </Box>
  );
};

export default TransactionsHistory;
