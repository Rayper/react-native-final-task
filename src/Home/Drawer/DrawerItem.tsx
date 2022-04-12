import React from 'react';

import { Theme, Box, useTheme } from '../../components/Theme';
import { RectButton } from 'react-native-gesture-handler';
import { RoundedIcon, Text } from '../../components';
import { HomeRoutes } from '../../components/Navigation';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface DrawerItemProps {
  icon: string;
  label: string;
  screen: keyof HomeRoutes;
  color: keyof Theme['colors'];
}

const DrawerItem = ({ icon, label, screen, color }: DrawerItemProps) => {
  const theme = useTheme();
  const { navigate } = useNavigation<DrawerNavigationProp<HomeRoutes, 'OutfitIdeas'>>();

  return (
    <RectButton onPress={() => navigate(screen)} style={{ borderRadius: theme.borderRadii.s }}>
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon iconRatio={0.5} name={icon} size={36} backgroundColor={color} color="white" />
        <Text variant="body" marginLeft="m" color="secondary">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
