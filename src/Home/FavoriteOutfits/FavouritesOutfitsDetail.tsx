import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { Card, FAB, List, Paragraph } from 'react-native-paper';

import { Box, Header, RoundedIconButton, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { FavouritesOutfitContext } from '../../context/Favourites/FavouritesOutfit';
import RoundedCheckBoxGroup from '../EditProfile/RoundedCheckBoxGroup';

const FavouritesOutfitDetails = ({
  navigation,
  route,
}: HomeNavigationProps<'FavouritesOutfitDetails'>) => {
  const [sizesExpanded, setSizesExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { favouritesOutfit, removeFavouritesOutfit, error } = useContext(FavouritesOutfitContext);

  const [state, setState] = React.useState({ open: false });

  const { open } = state;

  //@ts-ignore
  const { outfit } = route.params;
  console.log('outfit : ', outfit.sizes);

  const availableSizes = outfit.sizes.map(({ name }: any) => {
    console.log(name);
    return { value: name, label: name };
  });

  const plus = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const minus = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const isFavourite = favouritesOutfit.find(
    (fav: any) => fav.product.productId === outfit.productId,
  );

  if (isFavourite === undefined) {
    console.log('its not favourites product');
  } else {
    console.log('isFavourite : ', isFavourite);
  }

  const removeFromFavourites = async () => {
    await removeFavouritesOutfit(isFavourite.id);
    {
      error ? Alert.alert(error) : Alert.alert('Removed from favourites');
    }
  };

  //@ts-ignore
  const onStateChange = ({ open }) => setState({ open });

  return (
    <Box flex={1}>
      <Header
        tittle="Outfit Details"
        left={{ icon: 'arrow-left', onPress: () => navigation.navigate('FavoriteOutfits') }}
      />
      <Card style={{ height: '95%' }}>
        <Card.Cover source={{ uri: outfit.image }} style={{ height: '55%' }} />
        <Card.Title
          title={<Text variant="outfitBrand">{outfit.brand}</Text>}
          subtitle={outfit.name}
          style={{ marginBottom: -10 }}
          right={() => (
            <AntDesign
              name={
                // jika isFavourites true, pakai heart
                isFavourite ? 'heart' : 'hearto'
              }
              size={24}
              color={
                // jika isFavourites true, heartnya warna merah
                isFavourite ? '#2CB9B0' : '#2CB9B0'
              }
            />
          )}
          rightStyle={{ marginRight: 32, marginBottom: 15 }}
        />
        <Card.Content>
          <Paragraph>{outfit.description}</Paragraph>
          <Paragraph style={{ color: '#2CB9B0', fontSize: 16, fontWeight: 'bold' }}>
            {(Math.round(outfit.price) / 1000).toFixed(3)} IDR
          </Paragraph>
        </Card.Content>
        <Box marginVertical="s">
          <List.Accordion
            style={!sizesExpanded ? { backgroundColor: '#2CB9B0' } : { backgroundColor: '#2CB9B0' }}
            title="Pick your Size"
            titleStyle={
              !sizesExpanded
                ? { color: 'white', fontFamily: 'LEMONMILK-Regular', fontSize: 14 }
                : { color: 'white', fontFamily: 'LEMONMILK-Regular', fontSize: 14 }
            }
            expanded={sizesExpanded}
            onPress={() => setSizesExpanded(!sizesExpanded)}
          >
            <RoundedCheckBoxGroup radio options={availableSizes} />
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} variant="body">
              Quantity
            </Text>
            <Text
              style={{ textAlign: 'center', marginBottom: -20, fontWeight: 'bold' }}
              variant="body"
            >
              {quantity}
            </Text>
            <Box flexDirection="row" marginLeft="xl" marginBottom="m">
              <Box style={{ marginLeft: 110 }}>
                <RoundedIconButton
                  onPress={() => plus()}
                  name="plus"
                  size={30}
                  color="white"
                  backgroundColor="primary"
                  iconRatio={0.5}
                />
              </Box>

              <Box style={{ marginLeft: 50 }}>
                <RoundedIconButton
                  onPress={() => minus()}
                  name="minus"
                  size={30}
                  color="white"
                  backgroundColor="danger"
                  iconRatio={0.5}
                />
              </Box>
            </Box>
          </List.Accordion>
        </Box>
        <FAB.Group
          fabStyle={{ backgroundColor: '#2CB9B0', marginBottom: 40 }}
          color="white"
          open={open}
          icon={open ? 'rocket' : 'plus'}
          actions={[
            {
              icon: 'heart-remove',
              color: 'red',
              labelStyle: { backgroundColor: 'white' },
              label: 'Remove from favourites',
              labelTextColor: 'red',
              onPress: () => removeFromFavourites(),
            },
            {
              icon: 'cart',
              color: '#2CB9B0',
              labelStyle: { backgroundColor: 'white' },
              label: 'Add to Cart',
              labelTextColor: '#2CB9B0',
              onPress: () => Alert.alert('Added to Cart'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Card>
    </Box>
  );
};

export default FavouritesOutfitDetails;
