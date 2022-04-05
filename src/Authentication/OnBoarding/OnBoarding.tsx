import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from './Slide';
import Animated, { divide, multiply } from 'react-native-reanimated';
import { interpolateColor, onScrollEvent, useValue} from 'react-native-redash';
import Subslide from './Subslide';
import Dot from './Dot';

const { width, height } = Dimensions.get("window");

const slides = [
    { 
        title: "Relaxed",
        subtitle: "Find Your Outfits",
        description: "Confused about your outfits? Don't worry! Find the best outfit here",
        color: "#BFEAF5",
        picture: require("../../../assets/images/1.png")
    },
    { 
        title: "Playful",
        subtitle: "Hear it First, Wear it First",
        description: "Hating the clothes in your wardrobe? Explore hundreds of outif ideas",
        color: "#BEECC4",
        picture: require("../../../assets/images/2.png")
    },
    { 
        title: "Excentric",
        subtitle: "Your Style, Your Way",
        description: "Create your individual & unique style and look amazing everyday",
        color: "#FFE4D9",
        picture: require("../../../assets/images/3.png")
    },
    { 
        title: "Funky",
        subtitle: "Look Good, Feel Good", 
        description: "Discover the latest trends in fashion and explore your personality", 
        color: "#BFEAF5",
        picture: require("../../../assets/images/4.png")
    },
];

const OnBoarding = () => {
    const scroll = useRef<Animated.ScrollView>(null);

    const x = useValue(0);

    const onScroll = onScrollEvent({ x });

    const backgroundColor = interpolateColor(x, {
        // loop slides-nya disini
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map((slide) => slide.color),
    })

    return (
        <View style={styles.container}>
            <Animated.View 
                //@ts-ignore 
                style={[styles.slider, { backgroundColor }]}>
                    <Animated.ScrollView
                        ref={scroll} 
                        horizontal 
                        snapToInterval={width}
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        scrollEventThrottle={1}
                        {...{ onScroll }}
                    > 
                        {slides.map(({ title, picture }, index) => (
                            // jika indexnya bukan 0
                            <Slide key={index} right={!!(index % 2)} {...{ title , picture }} />
                        ))}
                    </Animated.ScrollView>
            </Animated.View>

            <View style={styles.footer}>
                <Animated.View
                    //@ts-ignore  
                    style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
                />

                <View style={styles.footerContent}>

                    <View style={styles.pagination}>
                            {slides.map((_, index) => (
                                <Dot 
                                    key={index} 
                                    currentIndex={divide(x, width)}
                                    {...{ index, x }}
                                />
                            ))}
                    </View>
                    
                    <Animated.View style={{ 
                        // translateX: multiply(x, -1) => dapetin datanya satu satu ber subtitle
                        flex: 1, 
                        width: width * slides.length,
                        transform: [{ translateX: multiply(x, -1) }],
                        flexDirection: 'row',
                    }}>

                    {slides.map(({ subtitle, description }, index) => (
                            // cek data sampai akhir dengan length
                            <Subslide
                                key={index}
                                onPress={() => {
                                    if(scroll.current) {
                                        // logic untuk pindah page ketika dipress button-nya
                                        scroll.current
                                        .getNode()
                                        .scrollTo({ x: width * (index + 1), animated: true })
                                    }
                                }} 
                                last={index === (slides.length - 1)}
                                {...{ subtitle, description, x }}                        />
                    ))}
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slider: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: BORDER_RADIUS, 

    },
    footer: {
        flex: 1
    },
    footerContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: BORDER_RADIUS
    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        height: BORDER_RADIUS,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default OnBoarding;
