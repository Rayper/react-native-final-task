import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';

import { Box, Header, makeStyles, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { Theme } from '../../components/Theme';

import Graph, { DataPoint } from './Graph';
import TopCurve from './TopCurve';
import Transaction from './Transaction';

const aspecRatio = 3;
const { width } = Dimensions.get('window');
const footerHeight = Dimensions.get('window').width / 3;

const startDate = new Date('2021-05-10').getTime();
const numberOfMonths = 6;

const data: DataPoint[] = [
  {
    date: new Date('2021-05-10').getTime(),
    value: 139.42,
    color: 'primary',
    id: 1,
  },
  {
    date: new Date('2021-06-10').getTime(),
    value: 0,
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
    value: 0,
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
  const styles = useStyles();

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
        <Graph data={data} startDate={startDate} numberOfMonths={numberOfMonths} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {data.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>
      </Box>
      <TopCurve {...{ footerHeight }} />
      <Box position="absolute" left={0} right={0} bottom={0} height={footerHeight}>
        <Image
          source={require('../../../assets/images/patterns/drawer.jpg')}
          style={styles.footer}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

export default TransactionsHistory;
