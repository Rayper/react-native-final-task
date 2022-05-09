import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { BASE_URL } from '../Product/ProductContext';

export const FavouritesOutfitContext = createContext<any>({});

interface FavouritesOutfitContextProviderProps {
  children: ReactNode;
}

export const FavouritesOutfitContextProvider = ({
  children,
}: FavouritesOutfitContextProviderProps) => {
  const [favouritesOutfit, setFavouritesOutfit] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => await getFavouritesOutfit())();
  }, [user]);

  const getFavouritesOutfit = async () => {
    const bearerToken = await AsyncStorage.getItem('token');

    if (bearerToken) {
      await axios
        .get(`${BASE_URL}/favourite/getAllFavourites`, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        })
        .then((response) => {
          setFavouritesOutfit(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error while getting favourites : ', error);
          setError(error);
        });
    }
  };

  const addFavouritesOutfit = async (productId: number) => {
    const bearerToken = await AsyncStorage.getItem('token');

    if (bearerToken) {
      await axios
        .post(
          `${BASE_URL}/favourite/addFavouritesProduct`,
          { productId },
          { headers: { Authorization: `Bearer ${bearerToken}` } },
        )
        .then(async (response) => {
          await getFavouritesOutfit();
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error while adding to favourites : ', error);
          setError(error);
        });
    }
  };

  const removeFavouritesOutfit = async (favouritesId: number) => {
    const bearerToken = await AsyncStorage.getItem('token');

    if (bearerToken) {
      await axios
        .delete(`${BASE_URL}/favourite/deleteFavouritesProduct/${favouritesId}`, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        })
        .then(async (response) => {
          await getFavouritesOutfit();
          console.log('removed data : ', response.data);
        })
        .catch((error) => {
          console.log('error while removing from favourites : ', error);
          setError(error);
        });
    }
  };

  return (
    <FavouritesOutfitContext.Provider
      value={{
        favouritesOutfit,
        getFavouritesOutfit,
        addFavouritesOutfit,
        removeFavouritesOutfit,
        error,
      }}
    >
      {children}
    </FavouritesOutfitContext.Provider>
  );
};
