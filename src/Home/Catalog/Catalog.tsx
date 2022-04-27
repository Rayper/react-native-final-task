import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Box, Header } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { BASE_URL, ProductContext } from '../../context/Product/ProductContext';
import { ProductModel } from './models/Product_model';

import OutfitCatalog from './OutfitCatalog';

const defaultOutfitItems = [
  {
    id: 1,
    brand: 'Nike',
    name: 'Blue Nike Hoodie',
    price: '650000',
    sizes: ['s', 'm', 'l', 'xl'],
    image:
      'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/f26a1549bbbdda07b467ea5648042bec755deace_xxl-1.jpg',
  },
  {
    id: 2,
    brand: 'Adidas',
    name: 'Red Adidas T-Shirt',
    price: '700000',
    sizes: ['s', 'm', 'l', 'xl'],
    image:
      'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/f26a1549bbbdda07b467ea5648042bec755deace_xxl-1.jpg',
  },
  {
    id: 3,
    brand: 'H&M',
    name: 'Dark Green H&M Hoodie',
    price: '500000',
    sizes: ['s', 'm', 'l', 'xl'],
    image:
      'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/f26a1549bbbdda07b467ea5648042bec755deace_xxl-1.jpg',
  },
  {
    id: 4,
    brand: 'Thrasher',
    name: 'Pricy Thrasher Hoodie',
    price: '900000',
    sizes: ['s', 'm', 'l', 'xl'],
    image:
      'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/f26a1549bbbdda07b467ea5648042bec755deace_xxl-1.jpg',
  },
  {
    id: 5,
    brand: 'Thrasher',
    name: 'Pricy Thrasher Hoodie',
    price: '900000',
    sizes: ['s', 'm', 'l', 'xl'],
    image:
      'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/f26a1549bbbdda07b467ea5648042bec755deace_xxl-1.jpg',
  },
  {
    id: 6,
    brand: 'Thrasher',
    name: 'Pricy Thrasher Hoodie',
    price: '900000',
    sizes: ['s', 'm', 'l', 'xl'],
    image:
      'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/f26a1549bbbdda07b467ea5648042bec755deace_xxl-1.jpg',
  },
];

const Catalog = ({ navigation, route }: HomeNavigationProps<'Catalog'>) => {
  const [outfitItems, _] = useState(defaultOutfitItems);
  // const { outfits } = useContext(ProductContext);
  const [outfits, setOutfits] = useState([]);

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
    (async () => await getAllProducts())()
  }, []);


  return (
    <>
      <Header
        tittle="Outfit Catalog"
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        right={{ icon: 'shopping-cart', onPress: () => navigation.navigate('Cart') }}
      />
      <Box flex={1} alignItems="center">
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Box flexDirection="row" flexWrap="wrap">
            {outfits.map((outfit: ProductModel) => (
              <OutfitCatalog
                key={outfit.productId}
                outfit={outfit}
                onPress={() => navigation.navigate('CatalogDetails', { Id: outfit.productId  })}
              />
            ))}
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default Catalog;
