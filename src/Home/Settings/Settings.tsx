import React from 'react';

import { Box, Content, Header } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

import Notification from './Notification';

const Settings = ({ navigation }: HomeNavigationProps<'Settings'>) => {
  return (
    <Content>
      <Box backgroundColor="white">
        <Header
          tittle="Notifications"
          left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
          right={{ icon: 'share', onPress: () => true }}
        />

        <Box padding="m">
          <Notification title="Outfit Ideas" description="Receive daily notification" />
          <Notification title="Discount & Sales" description="Buy the stuff you love for less" />
          <Notification
            title="Stock Notifications"
            description="If the product you 💜 comes back in stock"
          />
          <Notification title="New Stuff" description="Hear first, wear first" />
        </Box>
      </Box>
    </Content>
  );
};

export default Settings;
