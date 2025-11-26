
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { useCommunity } from '@helio/shared-logic';

const PostDetailScreen: React.FC<{ route: any }> = ({ route }) => {
    const { postId } = route.params;
    const { posts } = useCommunity();
    const post = useMemo(() => posts.find(p => p.id === postId), [posts, postId]);

    if (!post) return <View style={styles.container}><Text>Post not found</Text></View>;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Image source={{ uri: post.avatar }} style={styles.avatar} />
                    <View>
                        <Text style={styles.username}>{post.username}</Text>
                        <Text style={styles.meta}>{new Date(post.date).toLocaleDateString()}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    {post.title && <Text style={styles.title}>{post.title}</Text>}
                    <Text style={styles.body}>{post.content}</Text>
                </View>
                <View style={styles.commentsSection}>
                    <Text style={styles.sectionTitle}>التعليقات ({post.comments.length})</Text>
                    {post.comments.map(comment => (
                        <View key={comment.id} style={styles.comment}>
                            <Text style={styles.commentUser}>{comment.username}</Text>
                            <Text>{comment.content}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row-reverse', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 10 },
    username: { fontWeight: 'bold', textAlign: 'right' },
    meta: { color: 'gray', fontSize: 12, textAlign: 'right' },
    content: { padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' },
    body: { fontSize: 16, lineHeight: 24, textAlign: 'right' },
    commentsSection: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'right' },
    comment: { backgroundColor: '#f8fafc', padding: 10, borderRadius: 8, marginBottom: 10 },
    commentUser: { fontWeight: 'bold', marginBottom: 5, textAlign: 'right' }
});

export default PostDetailScreen;
