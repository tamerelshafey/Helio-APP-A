import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '@helio/shared-logic';
import PostCard from './PostCard';
import { ChatBubbleOvalLeftEllipsisIcon } from '../Icons';

const CommunityFeedTab: React.FC = () => {
    const { posts } = useCommunity();
    const navigation = useNavigation<any>();

    const sortedPosts = useMemo(() => {
        return [...posts].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [posts]);

    return (
        <View style={styles.container}>
            {sortedPosts.length > 0 ? (
                <FlatList
                    data={sortedPosts}
                    renderItem={({ item }) => <PostCard post={item} onPress={() => navigation.navigate('PostDetail', { postId: item.id })} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <ChatBubbleOvalLeftEllipsisIcon width={64} height={64} color="#9ca3af" />
                    <Text style={styles.emptyTitle}>لا توجد منشورات هنا</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    }
});

export default CommunityFeedTab;
