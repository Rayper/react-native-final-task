import React from 'react';
import { Box, Container, Text, Button, CloseButton } from '../components';
import { Routes, StackNavigationProps } from '../components/Navigation';

import { Feather as Icon } from '@expo/vector-icons';

const PasswordChanged = ({ navigation }: StackNavigationProps<Routes, 'PasswordChanged'>) => {
  const footer = (
    <Box flexDirection="row" justifyContent="center">
      <CloseButton onPress={() => navigation.pop()} />
    </Box>
  );

  const SIZE = 80;

  const onPushedBtn = () => {
    console.log('');
  };

  return (
    <Container {...{ footer }}>
      <Box flex={1} justifyContent="center" alignItems="center" marginTop="xl">
        <Box
          backgroundColor="primaryLight"
          alignItems="center"
          justifyContent="center"
          style={{ height: SIZE, width: SIZE, borderRadius: SIZE / 2 }}
          marginTop='xl'
        >
          <Text color="primary" textAlign="center">
            <Icon name="check" size={50} />
          </Text>
        </Box>

        <Text variant="title1" textAlign="center" marginBottom="m">
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
