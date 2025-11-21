import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useCommunity, useAuth, useServices } from '@helio/shared-logic';

const MyOffersPage: React.FC = () => {
    const { userOffers, offers } = useCommunity();
    const { services } = useServices();
    const { currentPublicUser } = useAuth();

    const myActiveOffers = userOffers.filter(uo => uo.userId === currentPublicUser?.id && uo.status === 'active');
    
    const getOfferDetails = (offerId: number) => offers.find(o => o.id === offerId);
    const getServiceDetails = (serviceId: number) => services.find(s => s.id === serviceId);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={myActiveOffers}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    const offerDetails = getOfferDetails(item.offerId);
                    if (!offerDetails) return null;
                    const serviceDetails = getServiceDetails(offerDetails.serviceId);

                    return (
                        <View style={styles.card}>
                            <Text style={styles.title}>{offerDetails.title}</Text>
                            {serviceDetails && <Text style={styles.serviceName}>لدى {serviceDetails.name}</Text>}
                            <Text style={styles.codeLabel}>الرمز:</Text>
                            <Text style={styles.code}>{item.redeemCode}</Text>
                        </View>
                    );
                }}
                ListHeaderComponent={<Text style={styles.header}>عروضي</Text>}
                ListEmptyComponent={<Text style={styles.emptyText}>ليس لديك عروض نشطة حالياً.</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    header: { fontSize: 28, fontWeight: 'bold', textAlign: 'right', padding: 20 },
    card: { backgroundColor: '#fff', padding: 20, marginHorizontal: 20, marginBottom: 15, borderRadius: 12, alignItems: 'center' },
    title: { fontSize: 18, fontWeight: 'bold' },
    serviceName: { color: 'gray' },
    codeLabel: { marginTop: 10, color: 'gray' },
    code: { fontSize: 24, fontWeight: 'bold', letterSpacing: 4, marginTop: 5 },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
});

export default MyOffersPage;
