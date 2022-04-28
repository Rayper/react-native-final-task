import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Box, Header } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { BASE_URL } from '../../context/Product/ProductContext';

import OutfitCard from './OutfitCard';

const Catalog = ({ navigation, route }: HomeNavigationProps<'Catalog'>) => {
  // const { outfits } = useContext(ProductContext);
  const [outfits, setOutfits] = useState<any[]>([]);

  const getAllProducts = async () => {
    let productData;
    await axios
      .get(`${BASE_URL}/product/findAllProducts`)
      .then((response) => {
        productData = response.data;
        setOutfits(productData);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    (async () => await getAllProducts())();
  }, []);

  return (
    <Box flex={1}>
      <Header
        tittle="Outfit Catalog"
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        right={{ icon: 'shopping-cart', onPress: () => navigation.navigate('Cart') }}
      />
      <FlatList
        data={outfits}
        numColumns={2}
        style={{
          flexBasis: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: 'white',
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('CatalogDetails', { outfit: item })}
            >
              <OutfitCard outfit={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.productId.toString()}
      />
    </Box>
  );
};

export default Catalog;
