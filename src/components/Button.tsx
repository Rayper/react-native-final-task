import { useTheme } from '@shopify/restyle';
import React from 'react';
import {Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Theme } from './Theme';

interface ButtonProps{
    variant: "default" | "primary";
    label: string;
    onPress: () => void
}

const Button = ({variant, label, onPress}: ButtonProps) => {
    const theme = useTheme<Theme>();
    // validasi untuk bg color dan color
    const backgroundColor = variant === "primary" ? theme.colors.primary : theme.colors.white; 
    const color = variant === "primary" ? theme.colors.white : theme.colors.text

    return (
        <RectButton 
            style={[styles.container, { backgroundColor }]}
            {...{ onPress }}    
        >
            <Text style={[styles.label, { color }]}>{label}</Text>
        </RectButton>
    );
};

Button.defaultProps = { varian: "default" };

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 50,
        width: 245,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontFamily: "SFProText-Regular",
        fontSize: 15,
        textAlign: "center"
    }
});

export default Button;