import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, FAB, List, Paragraph } from 'react-native-paper';
import { boolean } from 'yup';

import { Box, Header, RoundedIconButton, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { FavouritesOutfitContext } from '../../context/Favourites/FavouritesOutfit';
import CheckBoxGroup from '../EditProfile/CheckBoxGroup';
import RoundedCheckBoxGroup from '../EditProfile/RoundedCheckBoxGroup';

const CatalogDetails = ({ navigation, route }: HomeNavigationProps<'CatalogDetails'>) => {
  const [sizesExpanded, setSizesExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { favouritesOutfit, addFavouritesOutfit, removeFavouritesOutfit, error } =
    useContext(FavouritesOutfitContext);

  const [state, setState] = React.useState({ open: false });

  const { open } = state;

  //@ts-ignore
  const { outfit } = route.params;

  const availableSizes = outfit.sizes.map(({ name }: any) => {
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

  // still undefined
  const isFavourite = favouritesOutfit.find(
    (fav: any) => fav.outfit.productId === outfit.productId,
  );
  console.log(isFavourite);

  const addToFavourites = async () => {
    await addFavouritesOutfit(outfit.productId);
    {
      error ? Alert.alert(error) : Alert.alert('Added to favourites');
    }
  };

  const removeFromFavourites = async () => {
    await removeFavouritesOutfit(isFavourite.id);
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
          title={outfit.brand}
          subtitle={outfit.name}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <Card.Content>
          <Paragraph>{outfit.description}</Paragraph>
          <Paragraph>{outfit.price} IDR</Paragraph>
        </Card.Content>
        <Box marginVertical="s">
          <List.Accordion
            style={!sizesExpanded ? { backgroundColor: '#2CB9B0' } : { backgroundColor: '#2CB9B0' }}
            title="Pick your Size"
            titleStyle={!sizesExpanded ? { color: 'white' } : { color: 'white' }}
            expanded={sizesExpanded}
            onPress={() => setSizesExpanded(!sizesExpanded)}
          >
            <RoundedCheckBoxGroup radio options={availableSizes} />
          </List.Accordion>
          <Text style={{ textAlign: 'center' }} variant="body">
            Quantity
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: -20 }} variant="body">
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
        </Box>
        {isFavourite ? (
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
                label: 'Remove from Favourites',
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
        ) : (
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
                label: 'Add from favourites',
                labelTextColor: 'red',
                onPress: () => addToFavourites(),
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
        )}
      </Card>
    </Box>
  );
};

export default CatalogDetails;
