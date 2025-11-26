
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useServices } from '@helio/shared-logic';
import { HeartIcon } from '../components/Icons';
import { useNavigation } from '@react-navigation/native';

const FavoritesPage: React.FC = () => {
    const { services } = useServices();
    const navigation = useNavigation<any>();
    
    const favoriteServices = services.filter(s => s.isFavorite);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>المفضلة</Text>
            </View>
            
            {favoriteServices.length > 0 ? (
                <FlatList
                    data={favoriteServices}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.card} 
                            onPress={() => navigation.navigate('ServicesTab', { screen: 'ServiceDetail', params: { serviceId: item.id, serviceName: item.name } })}
                        >
                            <Text style={styles.serviceName}>{item.name}</Text>
                            <Text style={styles.serviceAddress}>{item.address}</Text>
                            <HeartIcon color="#EF4444" width={20} height={20} style={styles.heartIcon} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <HeartIcon width={80} height={80} color="#E2E8F0" />
                    <Text style={styles.emptyTitle}>قائمة المفضلة فارغة</Text>
                    <Text style={styles.emptyMessage}>أضف الخدمات التي تهمك للوصول إليها بسرعة.</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', color: '#0F172A' },
    list: { padding: 16 },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    serviceName: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', color: '#1E293B' },
    serviceAddress: { fontSize: 14, color: '#64748B', textAlign: 'right', marginTop: 4 },
    heartIcon: { position: 'absolute', top: 16, left: 16 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#334155', marginTop: 20 },
    emptyMessage: { fontSize: 16, color: '#94A3B8', textAlign: 'center', marginTop: 8 },
});

export default FavoritesPage;
