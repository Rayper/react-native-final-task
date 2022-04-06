import React, { useState } from 'react';

import { Box, Text } from '../../../components/Theme';

import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

interface CheckboxProps {
  label: string;
}

const Checkbox = ({ label }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    // ketika diklik, maka akan jadi true
    <RectButton onPress={() => setChecked((c) => !c)} style={{ justifyContent: 'center' }}>
      <Box flexDirection="row" alignItems="center">
        <Box
          alignItems="center"
          borderRadius="s"
          backgroundColor={checked ? 'primary' : 'white'}
          borderWidth={1}
          borderColor="primary"
          height={20}
          justifyContent="center"
          marginRight="s"
          width={20}
        >
          <Icon name="check" color="white" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </RectButton>
  );
};

export default Checkbox;
