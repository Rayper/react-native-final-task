import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { HomeRoutes } from '../components/Navigation';

import DrawerContent, { DRAWER_WIDTH } from './Drawer/Drawer';
import FavoriteOutfits from './FavoriteOutfits';
import OutfitIdeas from './OutfitIdeas';
import TransactionsHistory from './TransactionsHistory';

export { assets } from './Drawer';

const Drawer = createDrawerNavigator<HomeRoutes>();

export const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        drawerStyle: {
          width: DRAWER_WIDTH,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
      <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
      <Drawer.Screen name="TransactionsHistory" component={TransactionsHistory} />
    </Drawer.Navigator>
  );
};
