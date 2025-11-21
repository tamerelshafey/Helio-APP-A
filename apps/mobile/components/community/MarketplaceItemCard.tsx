import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import type { MarketplaceItem } from '@helio/shared-logic';
import { PhoneIcon } from '../Icons';

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 16;

const MarketplaceItemCard: React.FC<{ item: MarketplaceItem }> = ({ item }) => (
    <View style={styles.container}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>{item.price.toLocaleString('ar-EG')} جنيه</Text>
                <TouchableOpacity style={styles.button}>
                    <PhoneIcon color="#fff" width={12} height={12} />
                    <Text style={styles.buttonText}>تواصل</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    categoryBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    categoryText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        padding: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'right',
    },
    description: {
        fontSize: 12,
        color: '#64748B',
        height: 32,
        textAlign: 'right',
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0891b2',
    },
    button: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#22C55E',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 4,
    }
});

export default MarketplaceItemCard;
