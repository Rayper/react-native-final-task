import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Linking } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

import Footer from '../components/Footer';
import { Box, Container, Button, Text } from '../components';
import { Routes, StackNavigationProps } from '../components/Navigation';
import TextInput from '../components/Form/TextInput';

const ForgotPassword = ({ navigation }: StackNavigationProps<Routes, 'ForgotPassword'>) => {
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format'),
  });

  const { handleSubmit, control } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('PasswordChanged');
  };

  const myUrl = 'https://github.com/Rayper/';

  const footer = (
    <Footer title="Don't work?" action="Try another way" onPress={() => Linking.openURL(myUrl)} />
  );

  return (
    <Container {...{ footer }} pattern={4}>
      <Box padding="xl" justifyContent="center" flex={1} marginTop="xl">
        <Box marginBottom="l">
          <Text variant="title1" textAlign="center">
            Forgot Password?
          </Text>
        </Box>
        <Box marginBottom="l">
          <Text variant="body" textAlign="center">
            Enter the email address associated with your account
          </Text>
        </Box>

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
            <Box marginBottom="s">
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                touched={isTouched}
                icon="mail"
                placeholder="Enter your Email"
                autoCompleteType="email"
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

        <Box alignItems="center" marginBottom="l">
          <Button variant="primary" onPress={handleSubmit(onSubmit)} label="Reset Password" />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
