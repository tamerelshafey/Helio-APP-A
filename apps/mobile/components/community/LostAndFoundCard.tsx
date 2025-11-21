import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import type { LostAndFoundItem } from '@helio/shared-logic';
import { MapPinIcon } from '../Icons';

const LostAndFoundCard: React.FC<{ item: LostAndFoundItem }> = ({ item }) => {
    const [showContact, setShowContact] = useState(false);

    const handleContactPress = () => {
        if (showContact) {
            let url = item.contactInfo;
            if (!url.startsWith('tel:') && !url.startsWith('mailto:')) {
                url = `tel:${url.replace(/\s/g, '')}`;
            }
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                }
            });
        } else {
            setShowContact(true);
        }
    };

    return (
        <View style={styles.container}>
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <Text style={styles.username}>{item.username}</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.infoRow}>
                    <MapPinIcon color="#64748B" width={14} height={14} />
                    <Text style={styles.infoText}>الموقع: {item.location}</Text>
                </View>
                 <Text style={styles.infoText}>التاريخ: {new Date(item.date).toLocaleDateString('ar-EG-u-nu-latn')}</Text>
                <TouchableOpacity style={styles.button} onPress={handleContactPress}>
                    <Text style={styles.buttonText}>{showContact ? item.contactInfo : 'إظهار معلومات التواصل'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    content: {
        padding: 12,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    username: {
        marginRight: 8,
        fontWeight: '600',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    description: {
        fontSize: 14,
        color: '#475569',
        textAlign: 'right',
        marginVertical: 8,
    },
    infoRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: '#64748B',
        marginRight: 4,
    },
    button: {
        marginTop: 12,
        backgroundColor: '#0891b2',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default LostAndFoundCard;
