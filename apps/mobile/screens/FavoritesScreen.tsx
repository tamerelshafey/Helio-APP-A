import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useServices } from '@helio/shared-logic';
import ServiceCard from '../components/ServiceCard'; // Assuming ServiceCard is adapted for RN

const FavoritesPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { services } = useServices();
    
    const favoriteServices = services.filter(s => s.isFavorite);

    return (
        <SafeAreaView style={styles.container}>
            {favoriteServices.length > 0 ? (
                <FlatList
                    data={favoriteServices}
                    renderItem={({ item }) => <ServiceCard service={item} onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 10 }}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>قائمة المفضلة فارغة</Text>
                    <Text style={styles.emptyMessage}>لم تقم بإضافة أي خدمات إلى المفضلة بعد.</Text>
                    <Button title="تصفح الخدمات" onPress={() => navigation.navigate('ServicesTab')} />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptyMessage: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 16,
    }
});

export default FavoritesPage;
