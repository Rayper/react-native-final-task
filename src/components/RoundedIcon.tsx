import React from 'react';

import { Box, Text, Theme } from './Theme';

import { Feather as Icon } from '@expo/vector-icons';

export interface RoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme['colors'];
  backgroundColor: keyof Theme['colors'];
}

const RoundedIcon = ({ name, size, color, backgroundColor }: RoundedIconProps) => {
  const iconSize = size * 0.6;

  return (
    <Box
      height={size}
      width={size}
      alignItems="center"
      justifyContent="center"
      style={{ borderRadius: size / 2 }}
      {...{ backgroundColor }}
    >
      <Text {...{ color }} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={iconSize} {...{ name }} />
      </Text>
    </Box>
  );
};

export default RoundedIcon;
