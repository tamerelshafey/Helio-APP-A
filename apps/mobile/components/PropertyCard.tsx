import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import type { Property } from '@helio/shared-logic';

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 16;

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: property.images[0] || 'https://picsum.photos/400/300' }} style={styles.image} />
            <View style={[styles.typeBadge, {backgroundColor: property.type === 'sale' ? '#0891b2' : '#7c3aed'}]}>
                <Text style={styles.typeText}>{property.type === 'sale' ? 'للبيع' : 'للإيجار'}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{property.title}</Text>
                <Text style={styles.price}>{property.price.toLocaleString('ar-EG')} جنيه</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    typeBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        padding: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        height: 40, // for 2 lines
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0891b2',
        textAlign: 'right',
        marginTop: 4,
    }
});

export default PropertyCard;
