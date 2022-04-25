import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Alert, Image } from 'react-native';

import { Box, Button, Text } from '../../components';
import TextInput from '../../components/Form/TextInput';

import CheckBoxGroup from './CheckBoxGroup';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/Authentication/AuthContext';
import { loadingLogo } from '../../Authentication/SignUp';
import LoadingScreen from '../../components/LoadingScreen';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const PersonalInfo = () => {
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name field is required'),
    lastName: Yup.string().required('Last name field is required'),
    email: Yup.string().email('Invalid email format').required('Email field is required'),
    address: Yup.string().notRequired(),
  });

  const { userUpdatePersonalInfo, isLoading, user } = useContext(AuthContext);
  // const [address, setAddress] = useState('');

  const { handleSubmit, control, resetField, register } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: any) => {
    const updatePersonalInfoSuccess = await userUpdatePersonalInfo(data);
    if (updatePersonalInfoSuccess) {
      Alert.alert('Success Update Personal Info!');
      resetField('email');
      resetField('firstName');
      resetField('lastName');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box padding="m">
        <Text variant="title3" marginBottom="m">
          Account Information
        </Text>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error, isTouched },
              }) => (
                <Box marginBottom="s">
                  <TextInput
                    {...register('email')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    icon="mail"
                    placeholder="Enter your new Email Address"
                    error={error}
                    touched={isTouched}
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

            <Controller
              control={control}
              name="firstName"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error, isTouched },
              }) => (
                <Box marginBottom="s">
                  <TextInput
                    {...register('firstName')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    icon="user"
                    placeholder="enter your new First Name"
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
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error, isTouched },
              }) => (
                <Box marginBottom="s">
                  <TextInput
                    {...register('lastName')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    icon="user"
                    placeholder="enter your new First Name"
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
              name="address"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error, isTouched },
              }) => (
                <Box marginBottom="s">
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    icon="map-pin"
                    placeholder="jalan kiajurum"
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
            <Box alignItems="center">
              <Button variant="primary" onPress={handleSubmit(onSubmit)} label="Save Changes" />
            </Box>
          </>
        )}
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
