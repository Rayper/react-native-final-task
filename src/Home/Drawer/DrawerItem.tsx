import React from 'react';

import { Theme, Box, useTheme } from '../../components/Theme';
import { RectButton } from 'react-native-gesture-handler';
import { RoundedIcon, Text } from '../../components';
import { HomeRoutes } from '../../components/Navigation';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface ScreenDrawerItem extends BaseDrawerItem {
  screen: keyof HomeRoutes;
}

interface OnPressDrawerItem extends BaseDrawerItem {
  onPress: (navigation: ReturnType<typeof useNavigation>) => void;
}

export type DrawerItemProps = ScreenDrawerItem | OnPressDrawerItem;

export interface BaseDrawerItem {
  icon: string;
  label: string;
  color: keyof Theme['colors'];
}

const DrawerItem = ({ icon, label, color, ...props }: DrawerItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<HomeRoutes, 'OutfitIdeas'>>();

  return (
    <RectButton
      onPress={() =>
        // jika screen ada di props maka jalankan props screen, jika tidak ada maka jalankan props onPress
        'screen' in props ? navigation.navigate(props.screen) : props.onPress(navigation)
      }
      style={{ borderRadius: theme.borderRadii.s }}
    >
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
