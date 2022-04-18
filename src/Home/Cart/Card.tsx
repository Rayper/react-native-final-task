import React from 'react';
import { Image, View } from 'react-native';
import { Text } from '../../components';

import CardLayout from './CardLayout';

enum CardType {
  VISA,
  MASTERCARD,
}

export interface CardModel {
  id: number;
  type: CardType;
  last4Digits: number;
  expiration: string;
}

export interface CardProps {
  card: CardModel;
  selected: boolean;
  onSelect: () => void;
}

const visaLogo = require('../../../assets/images/visa.png');
const masterCardLogo = require('../../../assets/images/mastercard.png');

const Card = ({ card, selected, onSelect }: CardProps) => {
  return (
    <CardLayout backgroundColor={selected ? 'primary' : 'white'} onPress={onSelect}>
      <View style={{ height: 20 }}>
        <Image
          style={
            card.type === CardType.VISA ? { width: 39, height: 13 } : { width: 32.5, height: 20 }
          }
          source={card.type === CardType.VISA ? visaLogo : masterCardLogo}
        />
      </View>
      <Text variant="title3" marginTop="m" marginBottom="m" color={selected ? 'white' : 'text'}>
        **** {card.last4Digits}
      </Text>
      <Text opacity={0.5}>Expiration</Text>
      <Text opacity={0.5}>{card.expiration}</Text>
    </CardLayout>
  );
};

export default Card;
