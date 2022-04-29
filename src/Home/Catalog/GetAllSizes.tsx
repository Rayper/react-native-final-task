import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../../components';

interface SizesProps {
  name: string[];
}

const GetAllSizes = ({ name }: SizesProps) => {
  return (
    <TouchableOpacity>
      <Text variant="title3" style={{ marginBottom: 15, padding: 10 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default GetAllSizes;
