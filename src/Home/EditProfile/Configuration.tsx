import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Box, Button, Text } from '../../components';
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

const saveConfiguration = async () => {
  try {
    const jsonValue = JSON.stringify(outfitType);
    AsyncStorage.setItem('@outfitType', jsonValue);
  } catch (error) {
    console.log(error);
  }
};

const seeResult = async () => {
  let outfitTypeConfig = await AsyncStorage.getItem('@outfitType');
  //@ts-ignore
  let parsed = JSON.parse(outfitTypeConfig);
  alert(parsed.value);
};

const Configuration = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box padding="m">
        <Text variant="body">What type of Outfit you usually use?</Text>
        <TouchableOpacity onPress={() => saveConfiguration()}>
          <CheckBoxGroup options={outfitType} radio />
        </TouchableOpacity>
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

      <Box alignItems="center">
        <Button variant="primary" onPress={() => seeResult()} label="Submit" />
      </Box>
    </ScrollView>
  );
};

export default Configuration;
