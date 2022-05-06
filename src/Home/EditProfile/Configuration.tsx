import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Box, Button, Text } from '../../components';
import { AuthContext } from '../../context/Authentication/AuthContext';
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
  const { user } = useContext(AuthContext);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const getAllConfiguration = async (uid: any) => {
    try {
      const outfit = await AsyncStorage.getItem(`outfitType-${uid}`);
      //@ts-ignore
      console.log('outfitType : ', JSON.parse(outfit));
      const brands = await AsyncStorage.getItem('brands');
      //@ts-ignore
      console.log('brands : ', JSON.parse(brands));
      const sizes = await AsyncStorage.getItem('sizes');
      //@ts-ignore
      console.log('sizes : ', JSON.parse(sizes));
      const colors = await AsyncStorage.getItem('colors');
      //@ts-ignore
      console.log('colors : ', JSON.parse(colors));
    } catch (error) {
      console.log('error while getting Configuration : ', error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      getAllConfiguration(user.uid);
    }
  }, [user]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box padding="m">
        <Text variant="body">What type of Outfit you usually use? ( Choose 1 )</Text>
        <CheckBoxGroup
          options={outfitType}
          radio
          onPress={async (selected, uid: any) => {
            await AsyncStorage.setItem(`outfitType-${uid}`, JSON.stringify(selected));
          }}
        />
        <Text variant="body">What is your clothing size? ( Choose 1 ) </Text>
        <RoundedCheckBoxGroup
          //@ts-ignore
          options={sizes}
          radio
          onPress={async (selected) => {
            await AsyncStorage.setItem('sizes', JSON.stringify(selected));
          }}
        />
        <Text variant="body">My preffered clothing color</Text>
        <RoundedCheckBoxGroup
          //@ts-ignore
          options={colors}
          valueIsColor
          onPress={async (selected) => {
            // cek selected colors
            if (!selectedColors.includes(selected)) {
              await setSelectedColors([...selectedColors, selected]);
              await AsyncStorage.setItem('colors', JSON.stringify(selectedColors));
            } else {
              await setSelectedColors(
                selectedColors.filter((notSelected) => notSelected !== selected),
              );
            }
          }}
        />
        <Text variant="body">My preffered brands</Text>
        <CheckBoxGroup
          options={prefferedBrands}
          onPress={async (selected) => {
            // cek selected brands
            if (!selectedBrands.includes(selected)) {
              await setSelectedBrands([...selectedBrands, selected]);
              await AsyncStorage.setItem('brands', JSON.stringify(selectedBrands));
            } else {
              // kalau diclick lagi, remove dari array
              await setSelectedBrands(
                selectedBrands.filter((notSelected) => notSelected !== selected),
              );
            }
          }}
        />
      </Box>

      <Box alignItems="center" marginBottom="m">
        <Box alignItems="center" marginBottom="m">
          <Button variant="primary" 
          //@ts-ignore
          onPress={() => getAllConfiguration()} label="Submit" />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Configuration;
