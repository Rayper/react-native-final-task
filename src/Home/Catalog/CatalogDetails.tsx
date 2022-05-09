import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Card, FAB, List, Paragraph } from 'react-native-paper';

import { Box, Header, RoundedIconButton, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { CartContext } from '../../context/Cart/CartContext';
import { FavouritesOutfitContext } from '../../context/Favourites/FavouritesOutfitContext';
import RoundedCheckBoxGroup from '../EditProfile/RoundedCheckBoxGroup';

const CatalogDetails = ({ navigation, route }: HomeNavigationProps<'CatalogDetails'>) => {
  const [sizesExpanded, setSizesExpanded] = useState(false);

  const [outfitSize, setOutfitSize] = useState('');

  const [quantity, setQuantity] = useState(1);

  const { favouritesOutfit, addFavouritesOutfit, removeFavouritesOutfit, error } =
    useContext(FavouritesOutfitContext);

  const { addUserCart, errorCart } = useContext(CartContext);

  const [state, setState] = React.useState({ open: false });

  const { open } = state;

  //@ts-ignore
  const { outfit } = route.params;
  // console.log('outfit name : ', outfit.name);
  // console.log('outfit sizes : ', outfit.sizes[0].name);
  // console.log('outfit image : ', outfit.image);
  // console.log('outfit productId : ', outfit.productId);
  // console.log('outfit quantity : ', quantity);
  // console.log('outfit price : ', outfit.price);

  let addToCart = {
    productId: outfit.productId,
    name: outfit.name,
    size: outfitSize,
    quantity: quantity,
    price: outfit.price,
    image: outfit.image,
  };

  const availableSizes = outfit.sizes.map(({ name }: any) => {
    // console.log('size : ', name);
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

  // if (isFavourite === undefined) {
  //   console.log('its not favourites product');
  // } else {
  //   console.log('isFavourite : ', isFavourite);
  // }

  const addToFavourites = async () => {
    await addFavouritesOutfit(outfit.productId);
    {
      error ? Alert.alert(error) : Alert.alert('Added to favourites');
    }
  };

  const removeFromFavourites = async () => {
    await removeFavouritesOutfit(isFavourite.id);
    {
      error ? Alert.alert(error) : Alert.alert('Removed from favourites');
    }
  };

  const submitCart = async () => {
    if (addToCart.size === '') {
      Alert.alert('Choose your size 1st!');
    } else {
      await addUserCart(addToCart);
      {
        errorCart ? Alert.alert('error while adding to cart') : Alert.alert('Added to Cart');
      }
    }
  };

  //@ts-ignore
  const onStateChange = ({ open }) => setState({ open });

  return (
    <Box flex={1}>
      <Header
        tittle="Outfit Details"
        left={{ icon: 'arrow-left', onPress: () => navigation.navigate('Catalog') }}
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
            <RoundedCheckBoxGroup
              radio
              options={availableSizes}
              onPress={(size: string) => {
                console.log('selected size : ', size);
                setOutfitSize(size);
              }}
            />
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
        {!isFavourite ? (
          <FAB.Group
            fabStyle={{ backgroundColor: '#2CB9B0', marginBottom: 40 }}
            color="white"
            open={open}
            icon={open ? 'rocket' : 'plus'}
            actions={[
              {
                icon: 'heart',
                color: 'red',
                labelStyle: { backgroundColor: 'white' },
                label: 'Add to Favourites',
                labelTextColor: 'red',
                onPress: () => addToFavourites(),
              },
              {
                icon: 'cart',
                color: '#2CB9B0',
                labelStyle: { backgroundColor: 'white' },
                label: 'Add to Cart',
                labelTextColor: '#2CB9B0',
                onPress: () => submitCart(),
              },
            ]}
            onStateChange={onStateChange}
          />
        ) : (
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
                onPress: () => submitCart(),
              },
            ]}
            onStateChange={onStateChange}
          />
        )}
      </Card>
    </Box>
  );
};

export default CatalogDetails;
