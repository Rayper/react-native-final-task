import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Box, RoundedIcon, BorderlessTap } from '../../components';

const { width: wWidth } = Dimensions.get('window');

interface OutfitProps {
  outfit: {
    color: string;
    aspectRatio: number;
    id: number;
    selected: boolean;
  };
  width: number;
}

const Outfit = ({ outfit, width }: OutfitProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <BorderlessTap
      onPress={() => {
        setSelected((prev) => !prev);
        // ketika outfit di klik maka selected tersebut akan menjadi true
        outfit.selected = !outfit.selected;
      }}
    >
      <Box
        borderRadius="m"
        marginBottom="m"
        alignItems="flex-end"
        paddingTop="m"
        paddingRight="s"
        style={{
          backgroundColor: outfit.color,
          width,
          height: width * outfit.aspectRatio,
        }}
      >
        {selected && (
          <RoundedIcon
            iconRatio={0.5}
            name="check"
            backgroundColor="primary"
            color="white"
            size={24}
          />
        )}
      </Box>
    </BorderlessTap>
  );
};

export default Outfit;
