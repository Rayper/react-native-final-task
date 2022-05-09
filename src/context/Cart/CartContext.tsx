import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, BASE_URL } from '../Authentication/AuthContext';

export const CartContext = createContext<any>({});

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState([]);
  const [errorCart, setErrorCart] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async () => await getUserCart();
  }, [user]);

  const getUserCart = async () => {
    const bearerToken = await AsyncStorage.getItem('token');

    if (bearerToken) {
      await axios
        .get(`${BASE_URL}/cart/getUserCart`, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        })
        .then((response) => {
          setCart(response.data);
          console.log('user Cart : ', response.data);
        })
        .catch((error) => {
          console.log('error while getting cart : ', error);
          setErrorCart(error.response.data.message);
        });
    }
  };

  const addUserCart = async (data: any) => {
    const bearerToken = await AsyncStorage.getItem('token');

    if (bearerToken) {
      await axios
        .post(`${BASE_URL}/cart/addToCart`, data, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        })
        .then(async (response) => {
          await getUserCart();
          console.log('added cart : ', response.data);
        })
        .catch((error) => {
          console.log('error while adding to cart : ', error);
          setErrorCart(error.response.data.message);
        });
    }
  };

  return (
    <CartContext.Provider
      value={{
        addUserCart,
        getUserCart,
        cart,
        errorCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
