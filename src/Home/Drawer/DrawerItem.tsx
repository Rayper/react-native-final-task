import React from 'react';

import { Theme, Box, useTheme } from '../../components/Theme';
import { RectButton } from 'react-native-gesture-handler';
import { RoundedIcon, Text } from '../../components';

export interface DrawerItemProps {
  icon: string;
  label: string;
  screen: string;
  color: keyof Theme['colors'];
}

const DrawerItem = ({ icon, label, screen, color }: DrawerItemProps) => {
  const theme = useTheme();
  return (
    <RectButton style={{ borderRadius: theme.borderRadii.m }}>
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon name={icon} size={36} backgroundColor={color} color="white" />
        <Text variant="body" marginLeft="m" color="secondary">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
