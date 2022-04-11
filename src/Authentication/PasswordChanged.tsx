import React from 'react';
import { Box, Container, Text, Button, RoundedIconButton } from '../components';
import { AuthNavigationProps } from '../components/Navigation';

import { Feather as Icon } from '@expo/vector-icons';

const PasswordChanged = ({ navigation }: AuthNavigationProps<'PasswordChanged'>) => {
  const footer = (
    <Box flexDirection="row" justifyContent="center">
      <RoundedIconButton
        name="x"
        size={60}
        backgroundColor="white"
        color="secondary"
        onPress={() => navigation.pop()}
      />
    </Box>
  );

  const SIZE = 80;

  const onPushedBtn = () => {
    console.log('');
  };

  return (
    <Container {...{ footer }} pattern={4}>
      <Box flex={1} justifyContent="center" alignItems="center" marginTop="xl" padding="xl">
        <Box marginTop="xl">
          <RoundedIconButton
            name="check"
            size={SIZE}
            backgroundColor="primaryLight"
            color="primary"
            onPress={() => null}
          />
        </Box>

        <Text variant="title1" textAlign="center" marginVertical="m">
          Your password was successfully changed
        </Text>

        <Text variant="body" textAlign="center" marginBottom="s">
          Close this window and login again.
        </Text>

        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={() => navigation.navigate('Login')}
            label="Back to Login"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordChanged;
