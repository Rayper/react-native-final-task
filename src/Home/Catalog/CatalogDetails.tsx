import { backgroundColor } from '@shopify/restyle';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, FAB, List, Paragraph } from 'react-native-paper';
import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { BASE_URL } from '../../context/Authentication/AuthContext';

const CatalogDetails = ({ navigation, route }: HomeNavigationProps<'CatalogDetails'>) => {
  const [sizesExpanded, setSizesExpanded] = useState(false);

  const [state, setState] = React.useState({ open: false });

  const { open } = state;

  //@ts-ignore
  const { Id } = route.params;
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const getProductById = async () => {
    const { data } = await axios.get(`${BASE_URL}/product/details/${Id}`);

    setName(data.name);
    setBrand(data.brand);
    setDescription(data.description);
    setPrice(data.price);
    // console.log(data);
  }

  useEffect(() => {
    (async () => await getProductById())()
  }, [getProductById])

  //@ts-ignore
  const onStateChange = ({ open }) => setState({ open });

  return (
    <Box flex={1}>
      <Header
        tittle="Outfit Details"
        left={{ icon: 'arrow-left', onPress: () => navigation.navigate('Catalog') }}
      />
      <Card style={{ height: '90%' }}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{ height: '30%' }} />
        <Card.Title
          title={brand}
          subtitle={name}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <Card.Content>
          <Paragraph>{description}</Paragraph>
          <Paragraph>{price} IDR</Paragraph>
        </Card.Content>
        <Box marginVertical="s">
          <List.Accordion
            style={!sizesExpanded ? { backgroundColor: '#2CB9B0' } : { backgroundColor: '#2CB9B0' }}
            title="Pick your Size"
            titleStyle={!sizesExpanded ? { color: 'white' } : { color: 'white' }}
            expanded={sizesExpanded}
            onPress={() => setSizesExpanded(!sizesExpanded)}
          >
            <TouchableOpacity>
              <Text variant="title3" style={{ marginBottom: 15, padding: 10 }}>
                S | Quantity : 45
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text variant="title3" style={{ marginBottom: 15, padding: 10 }}>
                M | Quantity : 45
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text variant="title3" style={{ marginBottom: 15, padding: 10 }}>
                L | Quantity : 45
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text variant="title3" style={{ marginBottom: 15, padding: 10 }}>
                XL | Quantity : 45
              </Text>
            </TouchableOpacity>
          </List.Accordion>
        </Box>
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
              onPress: () => Alert.alert('Added to Favourites'),
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

export default CatalogDetails;
