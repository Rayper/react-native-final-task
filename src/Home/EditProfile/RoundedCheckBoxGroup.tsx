import React, { useState } from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Box, Text, useTheme } from '../../components';

import { Feather as Icon } from '@expo/vector-icons';

interface RoundedCheckBoxGroupProps {
  options: { value: string; label: string }[];
  valueIsColor?: boolean;
}

const RoundedCheckBoxGroup = ({ options, valueIsColor }: RoundedCheckBoxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map(({ value }) => {
        //@ts-ignore
        const index = selectedValues.indexOf(value);
        const isSelected = index !== -1;

        const theme = useTheme();
        const backgroundColor = isSelected ? theme.colors.primary : theme.colors.grey;

        return (
          <BorderlessButton
            key={value}
            onPress={() => {
              if (isSelected) {
                selectedValues.splice(index, 1);
              } else {
                //@ts-ignore
                selectedValues.push(value);
              }
              setSelectedValues([...selectedValues]);
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isSelected ? 2 : 0,
                borderColor: valueIsColor ? value : backgroundColor,
                marginBottom: theme.spacing.m,
                marginRight: theme.spacing.s,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: valueIsColor ? value : backgroundColor,
                }}
              >
                {!valueIsColor && (
                  // jika valueIsColornya false, jalankan ini
                  <Text
                    textAlign="center"
                    variant="Header"
                    color={isSelected ? 'white' : 'secondary'}
                  >
                    {value.toUpperCase()}
                  </Text>
                )}
                {
                  // jika valueIsColor true, jalankan ini
                  valueIsColor && isSelected && <Icon color="white" name="check" size={16} />
                }
              </View>
            </View>
          </BorderlessButton>
        );
      })}
    </Box>
  );
};

export default RoundedCheckBoxGroup;
