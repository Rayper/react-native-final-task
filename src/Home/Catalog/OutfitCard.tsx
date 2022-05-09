import React from 'react';
import { Card, Paragraph } from 'react-native-paper';
import { Text } from '../../components';

const OutfitCard = ({ outfit }: any) => {
  return (
    <Card style={{ margin: 16, width: 170 }}>
      <Card.Cover source={{ uri: outfit.image }} />
      <Card.Title
        title={<Text variant="outfitBrand">{outfit.brand}</Text>}
        subtitle={outfit.name}
      />
      <Card.Content style={{ marginVertical: -10, marginBottom: 2 }}>
        <Paragraph>{outfit.description}</Paragraph>
        <Paragraph
          style={{ color: '#2CB9B0', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
        >
          {(Math.round(outfit.price) / 1000).toFixed(3)} IDR
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default OutfitCard;
