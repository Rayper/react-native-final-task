import React, { useContext, useRef, useState } from 'react';
import { Dimensions, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Transitioning, Transition, TransitioningView } from 'react-native-reanimated';

import { Header } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { Box, useTheme, Text } from '../../components/Theme';
import { FavouritesOutfitContext } from '../../context/Favourites/FavouritesOutfit';
import OutfitCard from '../Catalog/OutfitCard';

const FavoriteOutfits = ({ navigation }: HomeNavigationProps<'FavoriteOutfits'>) => {
  // const theme = useTheme();
  // const width = (wWidth - theme.spacing.m * 3) / 2;
  // untuk adjust footer height
  // const [footerHeight, setFooterHeight] = useState(0);
  // const [outfits, setOutfits] = useState(defaultoutfits);
  // const list = useRef<TransitioningView>(null);

  const { favouritesOutfit } = useContext(FavouritesOutfitContext);

  // untuk animasi
  const transition = (
    <Transition.Together>
      <Transition.Out type="fade" />
      <Transition.In type="fade" />
    </Transition.Together>
  );

  const noData = require('../../../assets/images/data-not-found.png');

  return (
    <Box flex={1} backgroundColor="white">
      <Header
        tittle="Favorite Outfits"
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        right={{ icon: 'shopping-bag', onPress: () => true }}
      />
      <Box flex={1}>
        {favouritesOutfit.length > 0 ? (
          <FlatList
            persistentScrollbar={true}
            data={favouritesOutfit}
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
                  onPress={() =>
                    navigation.navigate('FavouritesOutfitDetails', { outfit: item.product })
                  }
                >
                  <OutfitCard outfit={item.product} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Box position="absolute" top="45%" left="20%">
            <Image source={noData} style={{ width: 75, height: 100, alignSelf: 'center' }} />
            <Text variant="title2" style={{ textAlign: 'center' }}>
              No Favourites Product Yet
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FavoriteOutfits;
