import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RoundedIconButton from './RoundedIconButton';
import { Box, Text } from './Theme';

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  tittle: string;
  right: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({ left, tittle, right, dark }: HeaderProps) => {
  const issets = useSafeAreaInsets();
  const color = dark ? 'white' : 'secondary';
  const backgroundColor = dark ? 'secondary' : 'white';

  return (
    <Box
      flexDirection="row"
      style={{ marginTop: issets.top }}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="s"
    >
      <RoundedIconButton
        size={45}
        name={left.icon}
        onPress={left.onPress}
        {...{ color, backgroundColor }}
      />
      <Text variant="Header" {...{ color }}>
        {tittle.toUpperCase()}
      </Text>
      <RoundedIconButton
        size={45}
        name={right.icon}
        onPress={right.onPress}
        {...{ color, backgroundColor }}
      />
    </Box>
  );
};

Header.defaultProps = {
  dark: false,
};

export default Header;
