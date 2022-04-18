import React, { ReactNode } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';

import { BoxProps } from '@shopify/restyle';

import { Box } from '../../components';
import { Theme } from '../../components/Theme';

export interface CardLayoutProps {
  children: ReactNode;
  onPress: () => void;
  backgroundColor: BoxProps<Theme>['backgroundColor'];
}

const visaLogo = require('../../../assets/images/visa.png');
const masterCardLogo = require('../../../assets/images/mastercard.png');

const CardLayout = ({ onPress, children, backgroundColor }: CardLayoutProps) => {
  return (
    <BorderlessButton onPress={onPress}>
      <Box
        width={120}
        height={160}
        marginLeft="m"
        borderRadius="m"
        padding="m"
        backgroundColor={backgroundColor}
      >
        {children}
      </Box>
    </BorderlessButton>
  );
};

export default CardLayout;
