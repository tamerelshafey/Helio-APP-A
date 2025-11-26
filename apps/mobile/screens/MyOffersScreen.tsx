
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useCommunity, useAuth, useServices } from '@helio/shared-logic';
import { QrCodeIcon, TagIcon } from '../components/Icons';

const MyOffersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { userOffers, offers } = useCommunity();
    const { services } = useServices();
    const { currentPublicUser } = useAuth();

    const myActiveOffers = userOffers.filter(uo => uo.userId === currentPublicUser?.id && uo.status === 'active');
    
    const getOfferDetails = (offerId: number) => offers.find(o => o.id === offerId);
    const getServiceDetails = (serviceId: number) => services.find(s => s.id === serviceId);

    const renderOfferItem = ({ item }: { item: any }) => {
        const offerDetails = getOfferDetails(item.offerId);
        if (!offerDetails) return null;
        const serviceDetails = getServiceDetails(offerDetails.serviceId);

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.serviceInfo}>
                        <Text style={styles.title}>{offerDetails.title}</Text>
                        {serviceDetails && <Text style={styles.serviceName}>لدى {serviceDetails.name}</Text>}
                    </View>
                    <TagIcon color="#EC4899" width={24} height={24} />
                </View>
                
                <View style={styles.codeContainer}>
                    <View style={styles.qrPlaceholder}>
                        <QrCodeIcon color="#94A3B8" width={64} height={64} />
                    </View>
                    <View style={styles.codeInfo}>
                        <Text style={styles.codeLabel}>رمز الاستبدال:</Text>
                        <Text style={styles.code}>{item.redeemCode}</Text>
                    </View>
                </View>
                
                <Text style={styles.expiry}>تم الحصول عليه في: {new Date(item.generatedDate).toLocaleDateString('ar-EG')}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>عروضي النشطة</Text>
            </View>
            {myActiveOffers.length > 0 ? (
                <FlatList
                    data={myActiveOffers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderOfferItem}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyState}>
                    <TagIcon color="#CBD5E1" width={80} height={80} />
                    <Text style={styles.emptyTitle}>ليس لديك عروض نشطة</Text>
                    <Text style={styles.emptySubtitle}>تصفح العروض واحصل على خصومات حصرية.</Text>
                    <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('CommunityTab', { screen: 'CommunityMain' })}>
                        <Text style={styles.browseButtonText}>تصفح العروض</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    screenTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', color: '#0F172A' },
    list: { padding: 16 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
    cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 16 },
    serviceInfo: { flex: 1 },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', color: '#0F172A', marginBottom: 4 },
    serviceName: { fontSize: 14, color: '#64748B', textAlign: 'right' },
    codeContainer: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 16, marginBottom: 12 },
    qrPlaceholder: { width: 80, height: 80, backgroundColor: '#E2E8F0', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 16 },
    codeInfo: { flex: 1, alignItems: 'flex-end' },
    codeLabel: { fontSize: 12, color: '#64748B', marginBottom: 4 },
    code: { fontSize: 24, fontWeight: 'bold', color: '#0891b2', letterSpacing: 2 },
    expiry: { fontSize: 12, color: '#94A3B8', textAlign: 'center' },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#334155', marginTop: 20 },
    emptySubtitle: { fontSize: 14, color: '#94A3B8', marginTop: 8, textAlign: 'center', marginBottom: 30 },
    browseButton: { backgroundColor: '#0891b2', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
    browseButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default MyOffersScreen;
