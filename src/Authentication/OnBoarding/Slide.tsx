import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = 0.61 * height

interface SlideProps {
    title: string;
    right?: boolean;
}

const Slide = ({ title, right }: SlideProps) => {
    const transform = [
        { translateY: ( SLIDE_HEIGHT - 100 ) / 2 },
        { translateX: right ? width / 2 - 50 : -width / 2 + 50 },
        { rotate: right ? "-90deg" : "90deg" },
    ]

    return (
        <View style={styles.container}>
            <View style={[styles.tittleContainer, { transform }]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
    },
    tittleContainer: {
        height: 100,
        justifyContent: 'center'
    }
    ,
    title: {
        fontSize: 80,
        lineHeight: 80,
        fontFamily: "SFProText-Bold",   
        color: 'white',
        textAlign: 'center'
    }
});

export default Slide;