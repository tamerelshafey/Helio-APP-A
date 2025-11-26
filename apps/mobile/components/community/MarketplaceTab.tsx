
import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { useCommunity } from '@helio/shared-logic';
import MarketplaceItemCard from './MarketplaceItemCard';
import EmptyState from '../common/EmptyState'; // Assuming EmptyState is adapted for RN
import { ShoppingBagIcon } from '../Icons';

const MarketplaceTab: React.FC = () => {
    const { marketplaceItems } = useCommunity();
    const [searchTerm, setSearchTerm] = useState('');

    const approvedItems = useMemo(() => {
        return marketplaceItems
            .filter(item => item.status === 'approved')
            .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [marketplaceItems, searchTerm]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="ابحث عن منتج أو فئة..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            {approvedItems.length > 0 ? (
                <FlatList
                    data={approvedItems}
                    renderItem={({ item }) => <MarketplaceItemCard item={item} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    columnWrapperStyle={styles.column}
                />
            ) : (
                <View style={{marginTop: 40}}>
                    {/* Placeholder for EmptyState */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        margin: 10,
        textAlign: 'right'
    },
    list: {
        paddingHorizontal: 8,
    },
    column: {
        justifyContent: 'space-between',
    }
});

export default MarketplaceTab;
