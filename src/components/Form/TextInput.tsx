import React, { forwardRef } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { FieldError } from 'react-hook-form';
import { Box, useTheme } from '../Theme';

interface TextInputProps extends RNTextInputProps {
  icon: string;
  touched?: boolean;
  error?: FieldError;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ icon, error, touched, ...props }: TextInputProps, ref) => {
    const theme = useTheme();
    const SIZE = theme.borderRadii.m * 2.1;

    const reColor = !touched ? 'text' : error ? 'danger' : 'primary';
    const color = theme.colors[reColor];

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        borderRadius="s"
        borderColor={reColor}
        borderWidth={1}
        padding="s"
      >
        <Box padding="s">
          <Icon name={icon} size={16} {...{ color }} />
        </Box>

        <Box flex={1}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={color}
            {...{ ref }}
            {...props}
          />
        </Box>

        {touched && (
          <Box
            height={SIZE}
            width={SIZE}
            borderRadius="m"
            justifyContent="center"
            backgroundColor={!error ? 'primary' : 'danger'}
          >
            <Icon
              name={!error ? 'check' : 'x'}
              color="white"
              size={16}
              style={{ textAlign: 'center' }}
            />
          </Box>
        )}
      </Box>
    );
  },
);

export default TextInput;
