import React from 'react';

import { Box, Text, useTheme } from '../../components';

import SwipeableRow from './SwipeableRow';

interface ItemProps {
  onDelete: () => void;
}

const Item = ({ onDelete }: ItemProps) => {
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2;

  return (
    <SwipeableRow onDelete={onDelete} height={height}>
      <Box padding="m" flexDirection="row">
        <Box width={120} height={120} borderRadius="m" style={{ backgroundColor: '#BFEAF5' }} />
        <Box padding="m" flex={1} justifyContent="center">
          <Text variant="Header">Size M, L</Text>
          <Text variant="title3" marginBottom="s">
            Short Sleeve Organic Top
          </Text>
          <Text variant="title3" color="primary">
            250.000 IDR
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
              x2
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;
