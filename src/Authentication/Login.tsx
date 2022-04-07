import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput as RNTextInput } from 'react-native';

import Footer from './components/Footer';
import { Box } from '../components/Theme';

import { Container, Button, Text } from '../components';
import { StackNavigationProps, Routes } from '../components/Navigation';

import TextInput from './components/Form/TextInput';
import Checkbox from './components/Form/Checkbox';

import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: StackNavigationProps<Routes, 'Login'>) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('This field is required'),
    password: Yup.string()
      .required('This field is required')
      .min(4, 'Password too Short!')
      .max(50, 'Password too long!'),
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
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate('SignUp')}
    />
  );

  const password = useRef<RNTextInput>(null);

  return (
    <Container {...{ footer }}>
      <Box padding="l">
        <Text variant="title1" textAlign="center" marginBottom="l">
          Welcome back
        </Text>

        <Text variant="body" textAlign="center" marginBottom="l">
          Login into your Account
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
            <Box marginBottom="s">
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon="mail"
                placeholder="Enter your Email"
                error={error}
                touched={isTouched}
                autoCompleteType="email"
                autoCapitalize="none"
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => password.current?.focus()}
              />
              <Text style={{ color: 'red', alignSelf: 'stretch', fontSize: 13 }}>
                {error?.message}
              </Text>
            </Box>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur }, fieldState: { isTouched, error } }) => (
            <Box>
              <TextInput
                ref={password}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                touched={isTouched}
                icon="lock"
                placeholder="Enter your Password"
                secureTextEntry
                autoCompleteType="password"
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={() => handleSubmit(onSignPressed)}
              />
              <Text style={{ color: 'red', alignSelf: 'stretch', fontSize: 13 }}>
                {error?.message}
              </Text>
            </Box>
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
