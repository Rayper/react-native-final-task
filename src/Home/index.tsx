import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeRoutes } from '../components/Navigation';

import OutfitIdeas from './OutfitIdeas/OutfitIdeas';

const Drawer = createDrawerNavigator<HomeRoutes>();

export const HomeNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
    </Drawer.Navigator>
  );
};
