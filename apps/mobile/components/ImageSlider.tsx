import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ImageSlider: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Image Slider</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ImageSlider;
