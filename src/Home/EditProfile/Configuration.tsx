import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Box, Text } from '../../components';
import CheckBoxGroup from './CheckBoxGroup';
import RoundedCheckBoxGroup from './RoundedCheckBoxGroup';

const outfitType = [
  { value: 'men', label: 'For men' },
  { value: 'women', label: 'For women' },
  { value: 'both', label: 'For both' },
];

const prefferedBrands = [
  { value: 'adidas', label: 'Adidas' },
  { value: 'nike', label: 'Nike' },
  { value: 'converse', label: 'Converse' },
  { value: 'tommy-hilfiger', label: 'Tommy Hilfiger' },
  { value: 'billionaire-boys-club', label: 'Billionaire Boys Club' },
  { value: 'jordan', label: 'Jordan' },
  { value: 'le-coq-sportif', label: 'Le Coq Sportif' },
];

const sizes = [{ value: 's' }, { value: 'm' }, { value: 'l' }, { value: 'xl' }, { value: 'xxl' }];

const colors = [
  { value: '#0C0D34' },
  { value: '#FF0058' },
  { value: '#50B9DE' },
  { value: '#00D99A' },
  { value: '#FE5E33' },
];

const Configuration = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box padding="m">
        <Text variant="body">What type of Outfit you usually use?</Text>
        <CheckBoxGroup options={outfitType} radio />
        <Text variant="body">What is your clothing size?</Text>
        <RoundedCheckBoxGroup
          //@ts-ignore
          options={sizes}
        />
        <Text variant="body">My preffered clothing color</Text>
        <RoundedCheckBoxGroup
          //@ts-ignore
          options={colors}
          valueIsColor
        />
        <Text variant="body">My preffered brands</Text>
        <CheckBoxGroup options={prefferedBrands} />
      </Box>
    </ScrollView>
  );
};

export default Configuration;
