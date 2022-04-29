import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

import { Box, Button, Text } from '../../components';
import TextInput from '../../components/Form/TextInput';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/Authentication/AuthContext';
import LoadingScreen from '../../components/LoadingScreen';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const PersonalInfo = () => {
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    email: Yup.string().email('Invalid email format').optional(),
    address: Yup.string().optional(),
  });

  const { userUpdatePersonalInfo, isLoading, user } = useContext(AuthContext);

  const { handleSubmit, control, resetField, register } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      address: user?.address,
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
                    placeholder={user?.firstName}
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
                    placeholder={user?.lastName}
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
                    placeholder={user?.email}
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
                    placeholder={user?.address}
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
