import React from 'react';

import { Box, Text, Theme } from './Theme';

import { Feather as Icon } from '@expo/vector-icons';

export interface RoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme['colors'];
  backgroundColor: keyof Theme['colors'];
  iconRatio: number;
}

const RoundedIcon = ({ name, size, color, backgroundColor, iconRatio }: RoundedIconProps) => {
  const iconSize = size * iconRatio;

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

RoundedIcon.defaultProps = {
  iconRatio: 0.7,
};

export default RoundedIcon;
