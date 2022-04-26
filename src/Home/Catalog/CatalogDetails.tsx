import { backgroundColor } from '@shopify/restyle';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, FAB, List, Paragraph } from 'react-native-paper';
import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';

const CatalogDetails = ({ navigation }: HomeNavigationProps<'CatalogDetails'>) => {
  const [sizesExpanded, setSizesExpanded] = useState(false);

  const [state, setState] = React.useState({ open: false });

  const { open } = state;

  //@ts-ignore
  const onStateChange = ({ open }) => setState({ open });

  return (
    <Box flex={1}>
      <Header
        tittle="Outfit Details"
        left={{ icon: 'arrow-left', onPress: () => navigation.navigate('Catalog') }}
      />
      <Card style={{ height: '100%' }}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{ height: '30%' }} />
        <Card.Title
          title="Nike"
          subtitle="Black Nike Hoodie"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <Card.Content>
          <Paragraph>600000 IDR</Paragraph>
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
      </Card>
      <FAB.Group
        fabStyle={{ backgroundColor: '#2CB9B0' }}
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
    </Box>
  );
};

export default CatalogDetails;
