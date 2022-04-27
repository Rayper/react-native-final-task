import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';

export const BASE_URL = 'http://192.168.1.13:8000/api';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface PersonalInfoForm {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}

interface UpdatePasswordForm {
  password: string;
  confirmpassword: string;
}

export const AuthContext = createContext<any>({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [signInError, setSignInError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  const userSignUp = async (data: SignUpForm) => {
    setIsLoading(true);
    let responseUser;
    await axios
      .post(`${BASE_URL}/auth/register`, data)
      .then((response) => {
        responseUser = response.data;
        setIsLoading(false);
        setSignUpError('');
      })
      .catch((error) => {
        setSignUpError(error.response.data.message);
        setIsLoading(false);
      });
    return responseUser;
  };

  const userSignIn = async (data: LoginForm) => {
    const { email, password } = data;
    setIsLoading(true);
    let responseUser;
    await axios
      .post(`${BASE_URL}/auth/login`, { email, password })
      .then((response) => {
        responseUser = response.data;
        setIsLoading(false);
        setUser(responseUser);
        setSignInError('');
      })
      .catch((error) => {
        setSignInError(error.response.data.message);
        console.log(error.response.data.message);
        setIsLoading(false);
      });
    return responseUser;
  };

  const userUpdatePersonalInfo = async (data: PersonalInfoForm) => {
    const { email, firstName, lastName } = data;
    setIsLoading(true);
    let responseUser;
    await axios
      .patch(`${BASE_URL}/users/updatePersonalInfo`, { email, firstName, lastName })
      .then((response) => {
        responseUser = response.data;
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setIsLoading(false);
      });
    return responseUser;
  };

  const userUpdatePassword = async (data: UpdatePasswordForm) => {
    const { password, confirmpassword } = data;
    setIsLoading(true);
    let responseUser;
    await axios
      .patch(`${BASE_URL}/users/updatePassword`, { password, confirmpassword })
      .then((response) => {
        responseUser = response.data;
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setIsLoading(false);
      });
    return responseUser;
  };

  return (
    <AuthContext.Provider
      value={{
        userSignUp,
        signUpError,
        isLoading,
        signInError,
        userSignIn,
        user,
        userUpdatePersonalInfo,
        userUpdatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
