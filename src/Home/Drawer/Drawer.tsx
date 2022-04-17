import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Box, Header, Text } from '../../components';
import { theme } from '../../components/Theme';
import DrawerItem, { DrawerItemProps } from './DrawerItem';

export const assets = [require('../../../assets/images/patterns/drawer.jpg')];
const { width } = Dimensions.get('window');
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const items: DrawerItemProps[] = [
  {
    icon: 'zap',
    label: 'Outfit Ideas',
    screen: 'OutfitIdeas',
    color: 'primary',
  },
  {
    icon: 'heart',
    label: 'Favorites Outfit',
    screen: 'FavoriteOutfits',
    color: 'drawer1',
  },
  {
    icon: 'user',
    label: ' Edit Profile',
    screen: 'EditProfile',
    color: 'drawer2',
  },
  {
    icon: 'clock',
    label: 'Transactions History',
    screen: 'TransactionsHistory',
    color: 'drawer3',
  },
  {
    icon: 'settings',
    label: 'Notification Settings',
    screen: 'Settings',
    color: 'drawer4',
  },
  {
    icon: 'log-out',
    label: 'Logout',
    onPress: (navigation) =>
      //@ts-ignore
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Authentication' }],
        }),
      ),
    color: 'secondary',
  },
];

const Drawer = () => {
  const navigation = useNavigation();

  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            tittle="My Profile"
            left={{ icon: 'x', onPress: () => navigation.dispatch(DrawerActions.closeDrawer()) }}
            //@ts-ignore
            right={{ icon: 'shopping-bag', onPress: () => navigation.navigate('Cart') }}
            dark={true}
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="white"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="xl"
        >
          <Box
            position="absolute"
            left={DRAWER_WIDTH / 2 - 50}
            top={-50}
            backgroundColor="userCircle"
            style={{ borderRadius: 50 }}
            width={100}
            height={100}
          />
          <Box marginVertical="m">
            <Text variant="title1" textAlign="center">
              Rayper
            </Text>
            <Text variant="body" textAlign="center">
              Rayper@gmail.com
            </Text>
          </Box>
          {items.map((item) => (
            <DrawerItem key={item.icon} {...item} />
          ))}
        </Box>
      </Box>

      <Box backgroundColor="white" width={DRAWER_WIDTH} overflow="hidden" height={height * 0.61}>
        <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;
