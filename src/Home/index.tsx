import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { HomeRoutes } from '../components/Navigation';
import DrawerContent, { DRAWER_WIDTH } from './Drawer/Drawer';
export { assets } from './Drawer';
import OutfitIdeas from './OutfitIdeas/OutfitIdeas';

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
    </Drawer.Navigator>
  );
};
