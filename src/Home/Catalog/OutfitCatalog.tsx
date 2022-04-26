import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Paragraph } from 'react-native-paper';

interface OutfitCatalogProps {
  outfit: {
    id: number;
    name: string;
    brand: string;
    price: string;
    // sizes: string[];
    image: string;
  };
  onPress: () => void;
}

const OutfitCatalog = ({ outfit, onPress }: OutfitCatalogProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 16, width: 175 }}>
        <Card.Cover source={{ uri: outfit.image }} />
        <Card.Title
          title={outfit.brand}
          subtitle={outfit.name}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <Card.Content style={{ marginVertical: -7, marginBottom: 2 }}>
          <Paragraph>{outfit.price} IDR</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default OutfitCatalog;
