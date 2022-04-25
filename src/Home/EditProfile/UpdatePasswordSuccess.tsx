import React from 'react';

import { CommonActions, useNavigation } from '@react-navigation/native';

import { Box, Container, Text, Button, RoundedIconButton } from '../../components';

const UpdatePasswordSuccess = () => {
  const navigation = useNavigation();

  const footer = (
    <Box flexDirection="row" justifyContent="center">
      <RoundedIconButton
        iconRatio={0.5}
        name="x"
        size={60}
        backgroundColor="white"
        color="secondary"
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Authentication' }],
            }),
          )
        }
      />
    </Box>
  );

  const SIZE = 80;

  return (
    <Container {...{ footer }} pattern={4}>
      <Box flex={1} justifyContent="center" alignItems="center" marginTop="xl" padding="xl">
        <Box marginTop="xl">
          <RoundedIconButton
            iconRatio={0.5}
            name="check"
            size={SIZE}
            backgroundColor="primaryLight"
            color="primary"
            onPress={() => null}
          />
        </Box>

        <Text variant="title1" textAlign="center" marginVertical="m">
          Update password Success!
        </Text>

        <Text variant="body" textAlign="center" marginBottom="s">
          Close this window and login with your new credentials.
        </Text>

        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Authentication' }],
                }),
              )
            }
            label="Back to Login"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default UpdatePasswordSuccess;
