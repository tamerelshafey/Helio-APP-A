import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServiceCard: React.FC<any> = ({ service }) => {
    return (
        <View style={styles.container}>
            <Text>{service?.name || "Service Name"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    }
});

export default ServiceCard;
