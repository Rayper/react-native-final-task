import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ActivityIndicator, Image, TextInput as RNTextInput } from 'react-native';

import Footer from '../components/Footer';
import { Box } from '../components/Theme';

import { Container, Button, Text } from '../components';
import { AuthNavigationProps } from '../components/Navigation';

import TextInput from '../components/Form/TextInput';

import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

import { AuthContext } from '../context/Authentication/AuthContext';
import LoadingScreen from '../components/LoadingScreen';

const SignUp = ({ navigation }: AuthNavigationProps<'SignUp'>) => {
  const password = useRef<RNTextInput>(null);
  const confirmpassword = useRef<RNTextInput>(null);

  const { userSignUp, isLoading, signUpError } = useContext(AuthContext);

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name field is required'),
    lastName: Yup.string().required('Last name field is required'),
    email: Yup.string().email('Invalid email format').required('Email field is required'),
    password: Yup.string()
      .required('Password field is required')
      .min(6, 'Password too Short!')
      .max(50, 'Password too long!'),
    confirmpassword: Yup.string()
      .required('Confirm Password field is required')
      .equals([Yup.ref('password')], 'Password do not match'),
  });

  const { handleSubmit, control } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: any) => {
    const signUpSuccess = await userSignUp(data);
    if (signUpSuccess) {
      navigation.navigate('Login');
    }
  };

  const footer = (
    <Footer
      title="Already have an account?"
      action="Sign In here"
      onPress={() => navigation.navigate('Login')}
    />
  );

  return (
    <Container {...{ footer }} pattern={4}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box padding="l">
          <Text variant="title1" textAlign="center" marginBottom="l">
            Create Account
          </Text>

          <Text variant="body" textAlign="center" marginBottom="l">
            Create your Account to access our features
          </Text>

          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
              <Box marginBottom="s">
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon="user"
                  placeholder="Enter your first name"
                  error={error}
                  touched={isTouched}
                  autoCompleteType="name"
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="next"
                />
                <Text style={{ color: 'red', alignSelf: 'stretch', fontSize: 13 }}>
                  {error?.message}
                </Text>
              </Box>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
              <Box marginBottom="s">
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon="user"
                  placeholder="Enter your last name"
                  error={error}
                  touched={isTouched}
                  autoCompleteType="name"
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="next"
                />
                <Text style={{ color: 'red', alignSelf: 'stretch', fontSize: 13 }}>
                  {error?.message}
                </Text>
              </Box>
            )}
          />

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
                  returnKeyType="next"
                  returnKeyLabel="next"
                />
                <Text style={{ color: 'red', alignSelf: 'stretch', fontSize: 13 }}>
                  {error?.message}
                </Text>
              </Box>
            )}
          />

          <Controller
            control={control}
            name="confirmpassword"
            render={({ field: { value, onChange, onBlur }, fieldState: { isTouched, error } }) => (
              <Box>
                <TextInput
                  ref={confirmpassword}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error}
                  touched={isTouched}
                  icon="lock"
                  placeholder="Enter your Confirmation Password"
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
          {signUpError ? (
            <Text style={{ color: 'red', alignSelf: 'stretch', fontSize: 13 }}>{signUpError}</Text>
          ) : null}

          <Box alignItems="center" marginTop="m">
            <Button variant="primary" onPress={handleSubmit(onSubmit)} label="Sign Up" />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default SignUp;
