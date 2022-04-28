import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

interface OutfitCardProps {
  outfit: {
    productId: number;
    name: string;
    brand: string;
    description: string;
    price: string;
    sizes: string[];
    image: string;
  };
}

const OutfitCard = ({ outfit }: OutfitCardProps) => {
  return (
    <Card style={{ margin: 16, width: 170 }}>
      <Card.Cover source={{ uri: outfit.image }} />
      <Card.Title
        title={outfit.brand}
        subtitle={outfit.name}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      />
      <Card.Content style={{ marginVertical: -7, marginBottom: 2 }}>
        <Paragraph>{outfit.description}</Paragraph>
        <Paragraph>{outfit.price} IDR</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default OutfitCard;
