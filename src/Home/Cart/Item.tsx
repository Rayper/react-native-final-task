import React from 'react';
import { View } from 'react-native';
import { Box, useTheme } from '../../components';

interface ItemProps {}

const Item = () => {
  const theme = useTheme();

  return (
    <Box padding="m" flexDirection="row">
      <Box
        width={120}
        height={120}
        borderRadius="m"
        style={{ backgroundColor: theme.colors.yellow }}
      ></Box>
    </Box>
  );
};

export default Item;
