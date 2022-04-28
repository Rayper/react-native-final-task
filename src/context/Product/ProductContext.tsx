import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const BASE_URL = 'http://192.168.1.13:8000/api';

export const ProductContext = createContext<any>({});

interface ProductContextProviderProps {
  children: ReactNode;
}

interface outfit {
  productId: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  sizes: string[];
  image: string;
}

export const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [outfits, setOutfits] = useState<outfit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => await getAllProducts())();
  }, []);

  const getAllProducts = async () => {
    await axios
      .get(`${BASE_URL}/product/findAllProducts`)
      .then((response) => {
        setOutfits(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    //@ts-ignore
    <ProductContext.Provider value={(outfits, isLoading, getAllProducts)}>
      {children}
    </ProductContext.Provider>
  );
};
