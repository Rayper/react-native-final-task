import { DrawerActions } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';

import { Box, Header, Text, useTheme } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

import Configuration from './Configuration';
import PersonalInfo from './PersonalInfo';
import Tabs from './Tabs';

const { width } = Dimensions.get('window');

const tabs = [
  { id: 'configuration', title: 'Configuration' },
  { id: 'info', title: 'Personal Info' },
];

const EditProfile = ({ navigation }: HomeNavigationProps<'EditProfile'>) => {
  const theme = useTheme();

  return (
    <Box flex={1} backgroundColor="white">
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
            tittle="Edit Profile"
            left={{ icon: 'menu', onPress: () => navigation.dispatch(DrawerActions.openDrawer()) }}
            dark={true}
          />
        </Box>
      </Box>
      <Box>
        <Box
          position="absolute"
          left={width / 2 - 50}
          top={-50}
          backgroundColor="userCircle"
          style={{ borderRadius: 50 }}
          width={100}
          height={100}
        />
        <Box marginVertical="m" style={{ marginTop: 50 + theme.spacing.m }}>
          <Text variant="title1" textAlign="center">
            Rayper
          </Text>
          <Text variant="body" textAlign="center">
            Rayper@gmail.com
          </Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}>
        <Configuration />
        <PersonalInfo />
      </Tabs>
    </Box>
  );
};

export default EditProfile;
