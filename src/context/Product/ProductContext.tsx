import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const BASE_URL = 'http://192.168.1.13:8000/api';

export const ProductContext = createContext<any>({});

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [outfits, setOutfits] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => await getAllProducts())();
  }, []);

  const getAllProducts = async () => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}/product/findAllProducts`)
      .then((response) => {
        setOutfits(response.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    //@ts-ignore
    <ProductContext.Provider value={{ outfits, isLoading, getAllProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
