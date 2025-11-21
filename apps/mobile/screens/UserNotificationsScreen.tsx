import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Button } from 'react-native';
import { useNews, useUI } from '@helio/shared-logic';
// FIX: Corrected import for BellIcon from local Icons file
import { TrashIcon, BellIcon } from '../components/Icons';
import EmptyState from '../components/common/EmptyState';
import PageBanner from '../components/common/PageBanner';

const UserNotificationsPage: React.FC = () => {
    const { notifications } = useNews();
    const { showConfirmation, dismissedNotificationIds, dismissNotification, dismissAllNotifications } = useUI();

    const handleDismissAll = () => {
        // In React Native, Alert.alert is a common way to show confirmation.
        // For consistency with web, a custom confirmation modal context would be better,
        // but this is a quick fix.
        const allIds = notifications.map(n => n.id);
        dismissAllNotifications(allIds);
    };
    
    const visibleNotifications = notifications
        .filter(n => !dismissedNotificationIds.has(n.id))
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={visibleNotifications}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.notificationCard}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </View>
                        <TouchableOpacity onPress={() => dismissNotification(item.id)}>
                            <TrashIcon color="#9ca3af" width={20} height={20}/>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>الإشعارات</Text>
                        {visibleNotifications.length > 0 && 
                            <Button title="حذف الكل" color="#EF4444" onPress={() => dismissAllNotifications(notifications.map(n => n.id))} />
                        }
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <BellIcon color="#9ca3af" width={64} height={64} />
                        <Text style={styles.emptyText}>لا توجد إشعارات جديدة.</Text>
                    </View>
                }
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    header: { padding: 20, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center'},
    headerTitle: { fontSize: 28, fontWeight: 'bold' },
    notificationCard: { backgroundColor: 'white', padding: 15, marginHorizontal: 20, marginBottom: 10, borderRadius: 10, flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
    title: { fontWeight: 'bold', fontSize: 16, textAlign: 'right' },
    content: { color: 'gray', textAlign: 'right' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { marginTop: 10, fontSize: 16, color: 'gray' },
});
export default UserNotificationsPage;
