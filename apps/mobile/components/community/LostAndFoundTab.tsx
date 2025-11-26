
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCommunity } from '@helio/shared-logic';
import type { LostAndFoundItem } from '@helio/shared-logic';
import LostAndFoundCard from './LostAndFoundCard';
import { ArchiveBoxIcon } from '../Icons';

const LostAndFoundTab: React.FC = () => {
    const { lostAndFoundItems } = useCommunity();
    const [activeSubTab, setActiveSubTab] = useState<'lost' | 'found'>('lost');

    const filteredItems = useMemo(() => {
        return lostAndFoundItems
            .filter(item => item.status === 'approved' && item.type === activeSubTab)
            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [lostAndFoundItems, activeSubTab]);

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveSubTab('lost')} style={[styles.tabButton, activeSubTab === 'lost' && styles.activeTab]}>
                    <Text style={[styles.tabText, activeSubTab === 'lost' && styles.activeTabText]}>مفقودات</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveSubTab('found')} style={[styles.tabButton, activeSubTab === 'found' && styles.activeTab]}>
                    <Text style={[styles.tabText, activeSubTab === 'found' && styles.activeTabText]}>تم العثور عليها</Text>
                </TouchableOpacity>
            </View>
            {filteredItems.length > 0 ? (
                <FlatList
                    data={filteredItems}
                    renderItem={({ item }) => <LostAndFoundCard item={item} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <ArchiveBoxIcon width={64} height={64} color="#9ca3af" />
                    <Text style={styles.emptyTitle}>لا توجد {activeSubTab === 'lost' ? 'مفقودات' : 'موجودات'} حالياً</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#E2E8F0',
        borderRadius: 8,
        margin: 10,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    tabText: {
        fontWeight: '600',
        color: '#475569',
    },
    activeTabText: {
        color: '#0891b2',
    },
    list: {
        paddingHorizontal: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
});

export default LostAndFoundTab;
