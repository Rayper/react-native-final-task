import React from 'react';
import { Image } from 'react-native';

import { Box, Text, useTheme } from '../../components';

import SwipeableRow from './SwipeableRow';

interface ItemProps {
  onDelete: () => void;
  cartItem: any;
}

const Item = ({ onDelete, cartItem }: ItemProps) => {
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2;

  return (
    <SwipeableRow onDelete={onDelete} height={height}>
      <Box padding="m" flexDirection="row">
        <Image
          style={{
            width: 120,
            height: 120,
          }}
          source={{
            uri: `${cartItem.image}`,
          }}
        />
        <Box padding="m" flex={1} justifyContent="center">
          <Text variant="Header">Size : {cartItem.size}</Text>
          <Text variant="title3" marginBottom="s">
            {cartItem.name}
          </Text>
          <Text variant="title3" color="primary">
          {(cartItem.quantity * cartItem.price)} IDR
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box
            backgroundColor="secondary"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          >
            <Text variant="Header" color="white">
              x{cartItem.quantity}
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;
