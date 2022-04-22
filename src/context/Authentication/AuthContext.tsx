import axios from 'axios';
import { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';

export const BASE_URL = 'http://192.168.1.13:8000/api';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export const AuthContext = createContext<any>({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  // const [user, setUser] = useState(null);
  // const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [signUpError, setSignUpError] = useState('');

  const userSignUp = async (data: SignUpForm) => {
    setIsLoading(true);
    let responseUser;
    await axios
      .post(`${BASE_URL}/auth/register`, data)
      .then((result) => {
        responseUser = result.data;
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
        // signUpError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
