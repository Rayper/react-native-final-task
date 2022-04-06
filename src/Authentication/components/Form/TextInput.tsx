import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import theme, { Box } from '../../../components/Theme';
import { Feather as Icon } from '@expo/vector-icons';

interface TextInputProps extends RNTextInputProps {
  icon: string;
  validator: (input: string) => boolean;
}
const SIZE = theme.borderRadii.m * 2;

const Valid = true;
const Invalid = false;
const Pristine = null;

type InputState = typeof Valid | typeof Invalid | typeof Pristine;

const TextInput = ({ icon, validator, ...props }: TextInputProps) => {
  const [state, setState] = useState<null | boolean>(Pristine);

  const [input, setInput] = useState('');

  const reColor: keyof typeof theme.colors =
    state === Pristine ? 'text' : state === Valid ? 'primary' : 'danger';

  const color = theme.colors[reColor];

  const validate = () => {
    // jika dia valid
    const valid = validator(input);
    setState(valid);
  };

  const onChangeText = (text: string) => {
    setInput(text);
    if (state !== Pristine) {
      validate();
    }
  };

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderRadius="s"
      borderColor={reColor}
      borderWidth={StyleSheet.hairlineWidth}
      padding="s"
    >
      <Box padding="s">
        <Icon name={icon} size={16} {...{ color }} />
      </Box>
      <Box flex={1}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          onBlur={validate}
          {...{ onChangeText }}
          {...props}
        />
      </Box>
      {
        // jika valid
        (state === Valid || state === Invalid) && (
          <Box
            height={SIZE}
            width={SIZE}
            borderRadius="m"
            justifyContent="center"
            backgroundColor={state === Valid ? 'primary' : 'danger'}
          >
            <Icon name={state === Valid ? 'check' : 'x'} color="white" size={16} />
          </Box>
        )
      }
    </Box>
  );
};

export default TextInput;
