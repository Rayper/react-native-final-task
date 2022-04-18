import React, { useState } from 'react';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { Box, Button, Text, useTheme } from '../../components';

import Card from './Card';
import AddCard from './AddCard';

interface CheckoutProps {
  minHeight: number;
}

enum CardType {
  VISA,
  MASTERCARD,
}

const cards = [
  {
    id: 0,
    type: CardType.VISA,
    last4Digits: 5467,
    expiration: '05/26',
  },
  {
    id: 1,
    type: CardType.MASTERCARD,
    last4Digits: 2620,
    expiration: '02/26',
  },
];

interface LineItemProps {
  label: string;
  value: number;
}

const LineItem = ({ label, value }: LineItemProps) => {
  return (
    <Box flexDirection="row" paddingVertical="s">
      <Box flex={1}>
        <Text style={{ color: 'white' }} variant="title3">
          {label}{' '}
        </Text>
      </Box>
      <Box>
        <Text variant="valueLineItem">${value} </Text>
      </Box>
    </Box>
  );
};

const Checkout = ({ minHeight }: CheckoutProps) => {
  const [selectedCard, setSelectedCard] = useState(cards[0].id);

  const theme = useTheme();

  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight + theme.spacing.m }}>
      <Box flex={1} padding="m" marginTop="m">
        <Box height={160}>
          <ScrollView horizontal>
            <AddCard />
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                selected={selectedCard === card.id}
                onSelect={() => setSelectedCard(card.id)}
              />
            ))}
          </ScrollView>
        </Box>
        <Box marginTop="xl">
          <Text style={{ color: 'white' }} variant="title3">
            Delivery Address
          </Text>
          <Box flexDirection="row" opacity={0.6} paddingVertical="m">
            <Box flex={1}>
              <Text color="white">Unit 15, York Farm Business Centre,</Text>
              <Text color="white">Watling St, Towcester</Text>
            </Box>
            <Box justifyContent="center" alignItems="center">
              <RectButton onPress={() => alert('change delivery address?')}>
                <Text color="white">Change</Text>
              </RectButton>
            </Box>
          </Box>
          <LineItem label="Total Items (6)" value={189.94} />
          <LineItem label="Standard Delivery" value={12} />
          <LineItem label="Total Payment" value={201.94} />
        </Box>
        <Box paddingVertical="m" alignItems="center" justifyContent="flex-end" flex={1}>
          <Button
            label="Swipe to pay $201.94"
            variant="primary"
            onPress={() => alert('Pay now?')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
