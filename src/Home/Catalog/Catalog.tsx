import React, { useContext } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Box, Header } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { ProductContext } from '../../context/Product/ProductContext';

import OutfitCard from './OutfitCard';

const Catalog = ({ navigation }: HomeNavigationProps<'Catalog'>) => {
  const { outfits } = useContext(ProductContext);
  console.log('this is an outfit : ', outfits);

  return (
    <Box flex={1}>
      <Header
        tittle="Outfit Catalog"
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        right={{ icon: 'shopping-cart', onPress: () => navigation.navigate('Cart') }}
      />
      <FlatList
        persistentScrollbar={true}
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
