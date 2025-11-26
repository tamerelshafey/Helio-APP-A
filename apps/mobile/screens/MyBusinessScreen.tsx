
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth, useServices, useCommunity, ExclusiveOffer } from '@helio/shared-logic';
import { PlusIcon, TrashIcon, PencilSquareIcon } from '../components/Icons';
import AppModal from '../components/common/Modal';
import OfferForm from '../components/business/OfferForm';
import StatusBadge from '../components/common/StatusBadge';

const MyBusinessScreen: React.FC = () => {
    const { currentPublicUser } = useAuth();
    const { services } = useServices();
    const { offers, handleSaveOffer, handleDeleteOffer } = useCommunity();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<ExclusiveOffer | null>(null);

    const myServices = useMemo(() => services.filter(s => s.ownerId === currentPublicUser?.id), [services, currentPublicUser]);
    const myOffers = useMemo(() => offers.filter(o => o.ownerId === currentPublicUser?.id), [offers, currentPublicUser]);

    const handleAddOffer = () => {
        setEditingOffer(null);
        setIsModalOpen(true);
    };

    const handleEditOffer = (offer: ExclusiveOffer) => {
        setEditingOffer(offer);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        Alert.alert(
            "حذف العرض",
            "هل أنت متأكد أنك تريد حذف هذا العرض؟",
            [
                { text: "إلغاء", style: "cancel" },
                { text: "حذف", style: "destructive", onPress: () => handleDeleteOffer(id) }
            ]
        );
    };

    const handleSave = (data: any) => {
        handleSaveOffer(data);
        setIsModalOpen(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>إدارة أعمالي</Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>خدماتي المسجلة ({myServices.length})</Text>
                    {myServices.length > 0 ? (
                        myServices.map(service => (
                            <View key={service.id} style={styles.card}>
                                <Text style={styles.cardTitle}>{service.name}</Text>
                                <Text style={styles.cardSubtitle}>{service.address}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>لا توجد خدمات مسجلة.</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>عروضي الحصرية ({myOffers.length})</Text>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddOffer}>
                            <PlusIcon color="#fff" width={20} height={20} />
                            <Text style={styles.addButtonText}>إضافة عرض</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {myOffers.length > 0 ? (
                        myOffers.map(offer => (
                            <View key={offer.id} style={styles.offerCard}>
                                <View style={styles.offerHeader}>
                                    <Text style={styles.offerTitle}>{offer.title}</Text>
                                    <StatusBadge status={offer.status} />
                                </View>
                                <Text style={styles.offerDate}>ينتهي في: {offer.endDate}</Text>
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => handleEditOffer(offer)} style={styles.actionBtn}>
                                        <PencilSquareIcon color="#3B82F6" width={20} height={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(offer.id)} style={styles.actionBtn}>
                                        <TrashIcon color="#EF4444" width={20} height={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>لم تقم بإضافة أي عروض بعد.</Text>
                    )}
                </View>
            </ScrollView>

            <AppModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingOffer ? "تعديل العرض" : "إضافة عرض جديد"}
            >
                <OfferForm 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleSave} 
                    services={myServices} 
                    offer={editingOffer} 
                />
            </AppModal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    content: { padding: 16 },
    header: { marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'right', color: '#0F172A' },
    section: { marginBottom: 24 },
    sectionHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', color: '#334155' },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
    cardTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'right', color: '#0F172A' },
    cardSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'right', marginTop: 4 },
    emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 10, fontStyle: 'italic' },
    addButton: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#0891b2', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    addButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 6, fontSize: 14 },
    offerCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
    offerHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    offerTitle: { fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'right', marginLeft: 10, color: '#0F172A' },
    offerDate: { fontSize: 12, color: '#64748B', textAlign: 'right', marginBottom: 12 },
    actions: { flexDirection: 'row-reverse', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 8 },
    actionBtn: { padding: 8, marginLeft: 8 },
});

export default MyBusinessScreen;
