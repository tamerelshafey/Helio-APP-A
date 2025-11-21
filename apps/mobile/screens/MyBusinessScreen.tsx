import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAuth, useServices, useCommunity } from '@helio/shared-logic';

const MyBusinessPage: React.FC = () => {
    const { currentPublicUser } = useAuth();
    const { services } = useServices();
    const { offers } = useCommunity();

    const myServices = services.filter(s => s.ownerId === currentPublicUser?.id);
    const myOffers = offers.filter(o => o.ownerId === currentPublicUser?.id);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>إدارة أعمالي</Text>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>خدماتي ({myServices.length})</Text>
                    {myServices.map(service => (
                        <View key={service.id} style={styles.card}>
                            <Text>{service.name}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>عروضي ({myOffers.length})</Text>
                    {myOffers.map(offer => (
                        <View key={offer.id} style={styles.card}>
                            <Text>{offer.title}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    content: { padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'right', marginBottom: 20 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 }
});

export default MyBusinessPage;
