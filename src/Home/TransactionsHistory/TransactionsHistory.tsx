import React from 'react';
import { ScrollView } from 'react-native';

import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

import Graph, { DataPoint } from './Graph';
import Transaction from './Transaction';

const data: DataPoint[] = [
  {
    date: new Date('2021-05-10').getTime(),
    value: 139.42,
    color: 'primary',
    id: 1,
  },
  {
    date: new Date('2021-06-10').getTime(),
    value: 199.42,
    color: 'yellow',
    id: 2,
  },
  {
    date: new Date('2021-07-10').getTime(),
    value: 281.12,
    color: 'orange',
    id: 3,
  },
  {
    date: new Date('2021-08-10').getTime(),
    value: 250.08,
    color: 'violet',
    id: 4,
  },
  {
    date: new Date('2021-09-10').getTime(),
    value: 158.54,
    color: 'pink',
    id: 5,
  },
  {
    date: new Date('2021-10-10').getTime(),
    value: 190.9,
    color: 'primary',
    id: 6,
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
      <Box padding="m" flex={1}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Text variant="Header" color="secondary" opacity={0.3}>
              TOTAL SPENT
            </Text>
            <Text variant="title1">1219,48 IDR</Text>
          </Box>
          <Box backgroundColor="primaryLight" borderRadius="l" padding="m">
            <Text color="primary">All Time</Text>
          </Box>
        </Box>
        <Graph data={data} />
        <ScrollView>
          {data.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default TransactionsHistory;
