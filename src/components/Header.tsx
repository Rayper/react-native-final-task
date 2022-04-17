import React from 'react';
import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RoundedIconButton from './RoundedIconButton';
import { Box, Text } from './Theme';

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  tittle: string;
  right?: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({ left, tittle, right, dark }: HeaderProps) => {
  const issets = useSafeAreaInsets();
  const color = dark ? 'white' : 'secondary';

  return (
    <Box
      flexDirection="row"
      style={{ marginTop: issets.top }}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="s"
    >
      <RoundedIconButton
        iconRatio={0.5}
        size={44}
        name={left.icon}
        onPress={left.onPress}
        {...{ color }}
      />
      <Text variant="Header" {...{ color }}>
        {tittle.toUpperCase()}
      </Text>
      {right ? (
        <RoundedIconButton
          iconRatio={0.5}
          size={44}
          name={right.icon}
          onPress={right.onPress}
          {...{ color }}
        />
      ) : (
        <View style={{ width: 44 }} />
      )}
    </Box>
  );
};

Header.defaultProps = {
  dark: false,
};

export default Header;
