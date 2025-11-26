
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNews, useUI } from '@helio/shared-logic';
import { TrashIcon, BellIcon } from '../components/Icons';

const UserNotificationsPage: React.FC = () => {
    const { notifications } = useNews();
    const { dismissedNotificationIds, dismissNotification, dismissAllNotifications } = useUI();
    
    const visibleNotifications = notifications
        .filter(n => !dismissedNotificationIds.has(n.id))
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    
    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.headerTitle}>الإشعارات</Text>
                {visibleNotifications.length > 0 && (
                    <TouchableOpacity onPress={() => dismissAllNotifications(notifications.map(n => n.id))} style={styles.clearButton}>
                        <Text style={styles.clearText}>حذف الكل</Text>
                    </TouchableOpacity>
                )}
            </View>

            {visibleNotifications.length > 0 ? (
                <FlatList
                    data={visibleNotifications}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.notificationCard}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.content}>{item.content}</Text>
                                <Text style={styles.date}>{new Date(item.startDate).toLocaleDateString('ar-EG')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => dismissNotification(item.id)} style={styles.dismissButton}>
                                <TrashIcon color="#94A3B8" width={18} height={18}/>
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                />
            ) : (
                 <View style={styles.emptyContainer}>
                    <BellIcon color="#E2E8F0" width={80} height={80} />
                    <Text style={styles.emptyTitle}>لا توجد إشعارات جديدة</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#0F172A' },
    clearButton: { padding: 8 },
    clearText: { color: '#EF4444', fontWeight: '600' },
    list: { padding: 16 },
    notificationCard: { flexDirection: 'row-reverse', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    textContainer: { flex: 1, marginLeft: 10 },
    title: { fontWeight: 'bold', fontSize: 16, textAlign: 'right', color: '#1E293B', marginBottom: 4 },
    content: { color: '#475569', textAlign: 'right', fontSize: 14, lineHeight: 20 },
    date: { color: '#94A3B8', textAlign: 'right', fontSize: 12, marginTop: 8 },
    dismissButton: { padding: 4, alignSelf: 'flex-start' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyTitle: { marginTop: 20, fontSize: 18, fontWeight: '600', color: '#64748B' },
});

export default UserNotificationsPage;
