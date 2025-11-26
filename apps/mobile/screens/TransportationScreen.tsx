
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { useTransportation } from '@helio/shared-logic';
import { BusIcon, UserCircleIcon, MapIcon, PhoneIcon, CalendarDaysIcon } from '../components/Icons';

const TransportationScreen: React.FC = () => {
    const { transportation } = useTransportation();
    const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');

    const todayDate = new Date();
    const todayString = todayDate.toISOString().split('T')[0];
    const todaySchedule = transportation.weeklySchedule.find(d => d.date === todayString);
    const todayDayName = todayDate.toLocaleDateString('ar-EG', { weekday: 'long' });

    const handleCall = (number: string) => Linking.openURL(`tel:${number}`);

    const renderInternal = () => (
        <View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>مشرف الباصات الداخلية</Text>
                <View style={styles.contactRow}>
                    <View style={styles.contactInfo}>
                        <UserCircleIcon color="#0891b2" width={24} height={24} />
                        <Text style={styles.contactName}>{transportation.internalSupervisor.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.callButton} onPress={() => handleCall(transportation.internalSupervisor.phone)}>
                        <PhoneIcon color="#fff" width={16} height={16} />
                        <Text style={styles.callButtonText}>اتصال</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    <CalendarDaysIcon color="#0891b2" width={20} height={20} /> مناوبة اليوم: {todayDayName}
                </Text>
                {todaySchedule && todaySchedule.drivers.length > 0 ? (
                    todaySchedule.drivers.map((driver, index) => (
                        <View key={index} style={styles.driverRow}>
                            <Text style={styles.driverName}>{driver.name}</Text>
                            <TouchableOpacity style={styles.smallCallButton} onPress={() => handleCall(driver.phone)}>
                                <PhoneIcon color="#fff" width={14} height={14} />
                                <Text style={styles.smallCallText}>اتصال</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>لا يوجد سائقين مناوبين اليوم.</Text>
                )}
            </View>

            <View style={styles.card}>
                 <Text style={styles.cardTitle}>المسارات الداخلية</Text>
                 {transportation.internalRoutes.map(route => (
                     <View key={route.id} style={styles.routeRow}>
                         <View style={{flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 4}}>
                            <MapIcon color="#A855F7" width={16} height={16} />
                            <Text style={styles.routeName}>{route.name}</Text>
                         </View>
                         <Text style={styles.routePath}>{route.path}</Text>
                     </View>
                 ))}
            </View>
        </View>
    );

    const renderExternal = () => (
        <View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>مشرف الباصات الخارجية</Text>
                <View style={styles.contactRow}>
                    <View style={styles.contactInfo}>
                        <UserCircleIcon color="#7C3AED" width={24} height={24} />
                        <Text style={styles.contactName}>{transportation.externalSupervisor.name}</Text>
                    </View>
                    <TouchableOpacity style={[styles.callButton, { backgroundColor: '#7C3AED' }]} onPress={() => handleCall(transportation.externalSupervisor.phone)}>
                        <PhoneIcon color="#fff" width={16} height={16} />
                        <Text style={styles.callButtonText}>اتصال</Text>
                    </TouchableOpacity>
                </View>
            </View>

             {transportation.externalRoutes.map(route => (
                 <View key={route.id} style={styles.card}>
                     <Text style={styles.cardTitle}>{route.name}</Text>
                     <View style={styles.infoItem}>
                         <Text style={styles.infoLabel}>المواعيد:</Text>
                         <View style={styles.timingsContainer}>
                             {route.timings.map((time, i) => (
                                 <View key={i} style={styles.timingBadge}>
                                     <Text style={styles.timingText}>{time}</Text>
                                 </View>
                             ))}
                         </View>
                     </View>
                     <View style={styles.infoItem}>
                         <Text style={styles.infoLabel}>مكان الانتظار:</Text>
                         <Text style={styles.infoValue}>{route.waitingPoint}</Text>
                     </View>
                 </View>
             ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'internal' && styles.activeTab]} 
                    onPress={() => setActiveTab('internal')}
                >
                    <Text style={[styles.tabText, activeTab === 'internal' && styles.activeTabText]}>داخلي</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'external' && styles.activeTab]} 
                    onPress={() => setActiveTab('external')}
                >
                    <Text style={[styles.tabText, activeTab === 'external' && styles.activeTabText]}>خارجي</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {activeTab === 'internal' ? renderInternal() : renderExternal()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    tabs: { flexDirection: 'row-reverse', padding: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
    activeTab: { borderBottomColor: '#0891b2' },
    tabText: { fontSize: 16, color: '#64748B', fontWeight: '600' },
    activeTabText: { color: '#0891b2' },
    content: { padding: 16 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginBottom: 12, color: '#0F172A' },
    contactRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
    contactInfo: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
    contactName: { fontSize: 16, fontWeight: '600', marginRight: 8 },
    callButton: { flexDirection: 'row-reverse', backgroundColor: '#22C55E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignItems: 'center', gap: 4 },
    callButtonText: { color: '#fff', fontWeight: 'bold' },
    driverRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    driverName: { fontSize: 16 },
    smallCallButton: { flexDirection: 'row-reverse', backgroundColor: '#22C55E', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignItems: 'center', gap: 4 },
    smallCallText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 10 },
    routeRow: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    routeName: { fontSize: 16, fontWeight: '600', marginRight: 4, color: '#334155' },
    routePath: { fontSize: 14, color: '#64748B', textAlign: 'right' },
    infoItem: { marginBottom: 10 },
    infoLabel: { fontSize: 14, fontWeight: '600', textAlign: 'right', marginBottom: 4, color: '#475569' },
    infoValue: { fontSize: 14, color: '#334155', textAlign: 'right' },
    timingsContainer: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 6 },
    timingBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
    timingText: { fontSize: 12, fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }) }
});

export default TransportationScreen;
