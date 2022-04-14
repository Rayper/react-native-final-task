import React from 'react';
import { StyleSheet } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

import { Text, useTheme } from './Theme';

interface ButtonProps {
  variant: 'default' | 'primary';
  label: string;
  onPress: () => void;
  style?: RectButtonProperties['style'];
}

const Button = ({ variant, label, onPress, style }: ButtonProps) => {
  const theme = useTheme();
  // validasi untuk bg color dan color
  const backgroundColor = variant === 'primary' ? theme.colors.primary : theme.colors.grey;
  const color = variant === 'primary' ? theme.colors.white : theme.colors.secondary;

  return (
    <RectButton style={[styles.container, style, { backgroundColor }]} {...{ onPress }}>
      <Text variant="button" style={{ color }}>
        {label}
      </Text>
    </RectButton>
  );
};

Button.defaultProps = { varian: 'default' };

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
