import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Box, Header } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

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

const Catalog = ({ navigation }: HomeNavigationProps<'Catalog'>) => {
  const [outfitItems, _] = useState(defaultOutfitItems);

  return (
    <>
      <Header
        tittle="Outfit Catalog"
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        right={{ icon: 'shopping-bag', onPress: () => navigation.navigate('Cart') }}
      />
      <Box flex={1} alignItems="center">
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Box flexDirection="row" flexWrap="wrap">
            {outfitItems.map((outfit) => (
              <OutfitCatalog
                key={outfit.id}
                outfit={outfit}
                onPress={() => navigation.navigate('CatalogDetails')}
              />
            ))}
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default Catalog;
