import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const BASE_URL = 'http://192.168.1.13:8000/api';

export const ProductContext = createContext<any>({});

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [outfits, setOutfits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async () => {
    setIsLoading(true);
    let productData;
    await axios
      .get(`${BASE_URL}/product/findAllProducts`)
      .then((response) => {
        productData = response.data;
        setOutfits(productData);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    //@ts-ignore
    <ProductContext.Provider value={(outfits, isLoading, getAllProducts)}>
      {children}
    </ProductContext.Provider>
  );
};
