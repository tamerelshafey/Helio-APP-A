import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Linking, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useProperties } from '@helio/shared-logic';
import { PhoneIcon, MapPinIcon, CheckCircleIcon } from '../components/Icons';

const { width } = Dimensions.get('window');

const PropertyDetailScreen: React.FC<{ route: any }> = ({ route }) => {
    const { propertyId } = route.params;
    const { properties } = useProperties();
    const property = useMemo(() => properties.find(p => p.id === propertyId), [properties, propertyId]);

    const handleCall = (number: string) => Linking.openURL(`tel:${number}`);

    if (!property) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}><Text>لم يتم العثور على العقار</Text></View>
            </SafeAreaView>
        );
    }

    const priceLabel = property.type === 'rent' ? 'جنيه/شهرياً' : 'جنيه';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={{ uri: property.images[0] || `https://picsum.photos/400/300?random=${property.id}` }} style={styles.headerImage} />
                <View style={styles.content}>
                    <View style={[styles.typeBadge, {backgroundColor: property.type === 'sale' ? '#0891b2' : '#7c3aed'}]}>
                        <Text style={styles.typeText}>{property.type === 'sale' ? 'للبيع' : 'للإيجار'}</Text>
                    </View>
                    <Text style={styles.title}>{property.title}</Text>
                    <Text style={styles.address}>{property.location.address}</Text>
                    
                    <Text style={styles.price}>{property.price.toLocaleString('ar-EG')} {priceLabel}</Text>
                    
                    <Text style={styles.sectionTitle}>الوصف</Text>
                    <Text style={styles.description}>{property.description}</Text>

                    {property.amenities.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>وسائل الراحة</Text>
                            <View style={styles.amenitiesContainer}>
                                {property.amenities.map((amenity, index) => (
                                    <View key={index} style={styles.amenity}>
                                        <CheckCircleIcon color="#10B981" width={16} height={16} />
                                        <Text style={styles.amenityText}>{amenity}</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}

                     <View style={styles.contactContainer}>
                        <Text style={styles.sectionTitle}>معلومات الاتصال</Text>
                        <View style={styles.contactInfo}>
                            <MapPinIcon color="#64748B" width={20} height={20} />
                            <Text style={styles.contactName}>{property.contact.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.callButton} onPress={() => handleCall(property.contact.phone)}>
                            <PhoneIcon color="#fff" width={24} height={24} />
                            <Text style={styles.callButtonText}>اتصال: {property.contact.phone}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerImage: { width: '100%', height: 250 },
    content: { padding: 20 },
    typeBadge: {
        position: 'absolute',
        top: -15,
        right: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    typeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium', marginTop: 10 },
    address: { fontSize: 16, color: '#64748B', textAlign: 'right', marginTop: 4 },
    price: { fontSize: 28, fontWeight: 'bold', color: '#0891b2', textAlign: 'right', marginVertical: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginTop: 16, marginBottom: 8 },
    description: { fontSize: 16, lineHeight: 24, textAlign: 'right' },
    amenitiesContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
    },
    amenity: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        margin: 4,
    },
    amenityText: {
        marginLeft: 6,
        fontSize: 14,
    },
    contactContainer: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0'
    },
    contactInfo: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 12,
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    callButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22C55E',
        padding: 16,
        borderRadius: 12,
    },
    callButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default PropertyDetailScreen;
