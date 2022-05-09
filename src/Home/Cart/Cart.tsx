import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

import { Box, Header, useTheme, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { aspectRatio } from '../../components/Theme';
import { CartContext } from '../../context/Cart/CartContext';

import CartContainer from './CartContainer';
import Checkout from './Checkout';
import Item from './Item';

const height = 100 * aspectRatio;

const d = 'M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 0 Z';

const Cart = ({ navigation }: HomeNavigationProps<'Cart'>) => {
  // const [items, setItems] = useState(defaultItems);
  const theme = useTheme();
  const { cart } = useContext(CartContext);
  console.log('cart : ', cart);

  useEffect(() => {}, cart);

  return (
    <CartContainer CheckoutComponent={Checkout}>
      <Box>
        <Box backgroundColor="primary">
          <Header
            dark
            tittle="Shopping Cart"
            left={{ icon: 'arrow-left', onPress: () => navigation.goBack() }}
          />
        </Box>
      </Box>
      <Box flex={1}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 50 * aspectRatio }}
          showsVerticalScrollIndicator={false}
        >
          {cart &&
            cart.map((cartItem: any, index: any) => (
              <Item key={index} cartItem={cartItem} onDelete={() => alert('deleted')} />
            ))}
        </ScrollView>
        <Box style={{ position: 'absolute', top: 0, left: 0, right: 0, height }}>
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 375 100">
            <Path fill={theme.colors.primary} d={d} />
          </Svg>
          <Text variant="title2" textAlign="center" color="white">
            {cart.length} Items Added
          </Text>
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;
