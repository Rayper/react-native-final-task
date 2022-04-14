import React, { useState } from 'react';

import { Box, Button, useTheme } from '../../components';

interface CheckBoxGroupProps {
  options: { value: string; label: string }[];
  radio?: boolean;
}

const CheckBoxGroup = ({ options, radio }: CheckBoxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map(({ label, value }) => {
        //@ts-ignore
        const index = selectedValues.indexOf(value);
        const isSelected = index !== -1;
        const theme = useTheme();

        return (
          <Button
            key={value}
            variant={isSelected ? 'primary' : 'default'}
            onPress={() => {
              // kalau radio true, cuman bisa select 1
              if (radio) {
                setSelectedValues([value]);
              } else {
                if (isSelected) {
                  selectedValues.splice(index, 1);
                } else {
                  //@ts-ignore
                  selectedValues.push(value);
                }
                setSelectedValues([...selectedValues]);
              }
            }} //@ts-ignore
            label={label}
            style={{
              width: 'auto',
              height: 'auto',
              padding: 16,
              marginBottom: theme.spacing.m,
              marginRight: theme.spacing.s,
            }}
          />
        );
      })}
    </Box>
  );
};

export default CheckBoxGroup;
