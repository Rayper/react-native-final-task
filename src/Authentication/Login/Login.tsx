import React from 'react';

import { Container, Button, Text } from '../../components';
import { Box } from '../../components/Theme';
import TextInput from '../components/Form/TextInput';
import SocialLogin from '../components/SocialLogin';
import Checkbox from '../components/Form/Checkbox';

const emailValidator = (email: string) =>
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
    email,
  );

const passwordValidator = (password: string) => password.length >= 6;

const Login = () => {
  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button variant="transparent" onPress={() => alert('Sign Up!')} label={''}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="white">
              Don't have an account?
            </Text>
            <Text marginLeft="s" variant="button" color="primary">
              Sign Up here
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );
  return (
    <Container {...{ footer }}>
      <Box padding="l">
        <Text variant="title1" textAlign="center" marginBottom="l">
          Welcome back
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Login into your Account
        </Text>
        <Box marginBottom="m">
          <TextInput icon="mail" placeholder="Enter your Email" validator={emailValidator} />
        </Box>
        <TextInput icon="lock" placeholder="Enter your Password" validator={passwordValidator} />
        <Box flexDirection="row" justifyContent="space-between">
          <Checkbox label="Remember me" />
          <Button variant="transparent" onPress={() => alert('Forgot password!')} label="">
            <Text color="primary" marginLeft="xl">
              Forgot password
            </Text>
          </Button>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button variant="primary" onPress={() => alert('Sign In!')} label="Sign In" />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
