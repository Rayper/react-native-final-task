import React from 'react';

import { Feather as Icon } from '@expo/vector-icons';

import { Box } from '../../components';

import CardLayout from './CardLayout';

const AddCard = () => {
  //@ts-ignore
  return (
    <CardLayout onPress={() => alert('nambah kartu kang?')} backgroundColor="secondary">
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        borderRadius="m"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <Icon name="plus" color="white" size={32} />
      </Box>
    </CardLayout>
  );
};

export default AddCard;
