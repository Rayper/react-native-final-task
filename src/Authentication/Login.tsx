import React, { useContext, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ActivityIndicator, Image, TextInput as RNTextInput } from 'react-native';

import Footer from '../components/Footer';
import { Box } from '../components/Theme';

import { Container, Button, Text } from '../components';
import { AuthNavigationProps } from '../components/Navigation';

import TextInput from '../components/Form/TextInput';
import Checkbox from '../components/Form/Checkbox';

import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';
import { BorderlessButton } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../context/Authentication/AuthContext';
import LoadingScreen from '../components/LoadingScreen';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: AuthNavigationProps<'Login'>) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('This field is required'),
    password: Yup.string()
      .required('This field is required')
      .min(4, 'Password too Short!')
      .max(50, 'Password too long!'),
  });

  const { userSignIn, isLoading, signInError } = useContext(AuthContext);

  const { handleSubmit, control, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: any) => {
    const userLogin = await userSignIn(data);
    if (userLogin) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );
    }
  };

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate('SignUp')}
    />
  );

  const password = useRef<RNTextInput>(null);

  return (
    <Container {...{ footer }} pattern={4}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
              <Box marginBottom="s">
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
                  onSubmitEditing={() => handleSubmit(onSubmit)}
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

            <BorderlessButton onPress={() => navigation.navigate('ForgotPassword')}>
              <Text color="primary" marginLeft="xl">
                Forgot password
              </Text>
            </BorderlessButton>
          </Box>
          {signInError ? (
            <Box marginTop="s" alignItems="center">
              <Text style={{ color: 'red', fontSize: 13 }}>{signInError}</Text>
            </Box>
          ) : null}

          <Box alignItems="center" marginTop="m">
            <Button variant="primary" onPress={handleSubmit(onSubmit)} label="Sign In" />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Login;
