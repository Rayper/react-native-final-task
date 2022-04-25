import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Button, Text } from '../../components';
import TextInput from '../../components/Form/TextInput';
import CheckBoxGroup from './CheckBoxGroup';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/Authentication/AuthContext';
import { Alert } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

const AuthenticationSettings = () => {
  const SignUpSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password field is required')
      .min(6, 'Password too Short!')
      .max(50, 'Password too long!'),
    confirmpassword: Yup.string()
      .required('Confirm Password field is required')
      .equals([Yup.ref('password')], 'Password do not match'),
  });

  const { userUpdatePassword, isLoading, user } = useContext(AuthContext);
  const navigation = useNavigation();

  const { handleSubmit, control, resetField, register } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      confirmpassword: '',
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: any) => {
    const updatePersonalInfoSuccess = await userUpdatePassword(data);
    if (updatePersonalInfoSuccess) {
      resetField('password');
      resetField('confirmpassword');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'UpdatePasswordSuccess' }],
        }),
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box padding="m">
        <Text variant="title3" marginBottom="m">
          Change Password
        </Text>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { isTouched, error },
              }) => (
                <Box>
                  <TextInput
                    {...register('password')}
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
              render={({
                field: { value, onChange, onBlur },
                fieldState: { isTouched, error },
              }) => (
                <Box>
                  <TextInput
                    {...register('confirmpassword')}
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
                  />
                  <Text style={{ color: 'red', alignSelf: 'stretch', fontSize: 13 }}>
                    {error?.message}
                  </Text>
                </Box>
              )}
            />
            <Box alignItems="center" marginVertical="m">
              <Button variant="primary" onPress={handleSubmit(onSubmit)} label="Save Changes" />
            </Box>
          </>
        )}
      </Box>
    </ScrollView>
  );
};

export default AuthenticationSettings;
