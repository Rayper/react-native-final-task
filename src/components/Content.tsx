import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '.';

const viewBox = {
  width: 375,
  height: 100,
};

const { width } = Dimensions.get('window');
const height = (100 * width) / viewBox.width;

const d = 'M 0 0 H 375 A 50 50 0 0 1 325 50 H 50 A 0 50 0 0 0 0 100';

interface ContentProp {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProp) => {
  const theme = useTheme();

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require('../../assets/images/patterns/purpleBlue.jpg')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/patterns/purpleBlue_reverse.jpg')}
          style={styles.image}
        />
      </View>
      {children}
      <Svg viewBox={[0, 0, viewBox.width, viewBox.height].join(' ')} width={width} height={height}>
        <Path fill={theme.colors.white} d={d} />
      </Svg>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  image: {
    width,
    height: (width * 750) / 1125,
  },
});

export default Content;
