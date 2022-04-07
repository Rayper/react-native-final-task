import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Container, Button, Text } from '../../components';
import { Box } from '../../components/Theme';
import TextInput from '../components/Form/TextInput';
import SocialLogin from '../components/SocialLogin';
import Checkbox from '../components/Form/Checkbox';
import { StackNavigationProps, Routes } from '../../components/Navigation';

import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: StackNavigationProps<Routes, 'Welcome'>) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  const { handleSubmit, control, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSignPressed = (data: any) => {
    console.log(data);
    navigation.navigate('Welcome');
  };

  // simpen value email ketika remember me true
  // useEffect(() => {
  //   (async () => {
  //     const rememberMeEmail = await AsyncStorage.getItem('remember');
  //     if (rememberMeEmail) {
  //       setValue('email', rememberMeEmail);
  //       setValue('remember', true);
  //     }
  //   })();
  // }, []);

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
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon="mail"
                placeholder="Enter your Email"
                error={error}
                touched={isTouched}
              />
            )}
          />
        </Box>

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur }, fieldState: { isTouched, error } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error}
              touched={isTouched}
              icon="lock"
              placeholder="Enter your Password"
              secureTextEntry
            />
          )}
        />

        <Box flexDirection="row" justifyContent="space-between">
          <Controller
            control={control}
            name="remember"
            rules={{
              required: true,
            }}
            render={({ field: { value } }) => (
              <Checkbox
                label="Remember me"
                checked={value}
                onChange={(val: boolean) => setValue('remember', val)}
              />
            )}
          />
          <Button variant="transparent" onPress={() => alert('Forgot password!')} label="">
            <Text color="primary" marginLeft="xl">
              Forgot password
            </Text>
          </Button>
        </Box>

        <Box alignItems="center" marginTop="m">
          <Button variant="primary" onPress={handleSubmit(onSignPressed)} label="Sign In" />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
