import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { useServices } from '@helio/shared-logic';

const ServiceListScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const { subCategoryId } = route.params;
    const { services } = useServices();

    const filteredServices = useMemo(() => {
        return services.filter(s => s.subCategoryId === subCategoryId);
    }, [services, subCategoryId]);

    return (
        <SafeAreaView style={styles.container}>
            {filteredServices.length > 0 ? (
                <FlatList
                    data={filteredServices}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id, serviceName: item.name })}>
                            <Image source={{ uri: item.images[0] || `https://picsum.photos/200/200?random=${item.id}` }} style={styles.image} />
                            <View style={styles.cardContent}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.address}>{item.address}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>لا توجد خدمات في هذه الفئة حالياً.</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9', // slate-100
    },
    listContent: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    },
    address: {
        fontSize: 14,
        color: '#64748B', // slate-500
        textAlign: 'right',
        marginTop: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#64748B',
    },
});

export default ServiceListScreen;
