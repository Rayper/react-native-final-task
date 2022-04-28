import React, { useState } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, FAB, List, Paragraph } from 'react-native-paper';

import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

const CatalogDetails = ({ navigation, route }: HomeNavigationProps<'CatalogDetails'>) => {
  const [sizesExpanded, setSizesExpanded] = useState(false);

  const [state, setState] = React.useState({ open: false });

  const { open } = state;

  //@ts-ignore
  const { outfit } = route.params;

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
            <TouchableOpacity>
              <Text variant="title3" style={{ marginBottom: 15, padding: 10 }}>
                {outfit.sizes[0].name}
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
