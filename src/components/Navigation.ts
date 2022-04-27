import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, 'Home'>
  >;
  route: RouteProp<AuthRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

export type AppRoutes = {
  Authentication: any;
  Home: any;
};

export type HomeRoutes = {
  OutfitIdeas: any;
  FavoriteOutfits: any;
  TransactionsHistory: any;
  EditProfile: any;
  Settings: any;
  Cart: any;
  UpdatePasswordSuccess: any;
  Catalog: any;
  CatalogDetails: any;
};

export type AuthRoutes = {
  Onboarding: any;
  Welcome: any;
  Login: any;
  SignUp: any;
  ForgotPassword: any;
  PasswordChanged: any;
};
