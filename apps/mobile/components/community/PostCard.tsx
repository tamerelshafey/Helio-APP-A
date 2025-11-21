import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Post } from '@helio/shared-logic';
import { useCommunity, useAuth } from '@helio/shared-logic';
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon, PinIcon } from '../Icons';

const PostCard: React.FC<{ post: Post; onPress: () => void; }> = ({ post, onPress }) => {
    const { toggleLikePost } = useCommunity();
    const { currentPublicUser } = useAuth();
    const isLiked = currentPublicUser ? post.likes.includes(currentPublicUser.id) : false;

    const handleLikeClick = () => {
        if(!currentPublicUser) return; // Or navigate to login
        toggleLikePost(post.id);
    };

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, post.isPinned && styles.pinned]}>
            {post.isPinned && (
                <View style={styles.pinnedBadge}>
                    <PinIcon color="#0891b2" width={16} height={16} />
                    <Text style={styles.pinnedText}>مثبت</Text>
                </View>
            )}
            <View style={styles.header}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <View>
                    <Text style={styles.username}>{post.username}</Text>
                    <Text style={styles.meta}>{new Date(post.date).toLocaleDateString('ar-EG-u-nu-latn')} • {post.category}</Text>
                </View>
            </View>
            {post.title && <Text style={styles.title}>{post.title}</Text>}
            <Text style={styles.content} numberOfLines={3}>{post.content}</Text>
            
            <View style={styles.footer}>
                <View style={styles.stats}>
                    <ChatBubbleOvalLeftEllipsisIcon color="#64748B" width={20} height={20} />
                    <Text style={styles.statText}>{post.comments.length}</Text>
                </View>
                <TouchableOpacity onPress={handleLikeClick} style={[styles.likeButton, isLiked && styles.likedButton]}>
                    <HandThumbUpIcon color={isLiked ? '#DC2626' : '#64748B'} width={20} height={20} />
                    <Text style={[styles.statText, isLiked && styles.likedText]}>{post.likes.length}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 2,
    },
    pinned: {
        borderColor: '#0891b2',
        borderWidth: 1,
    },
    pinnedBadge: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 8,
    },
    pinnedText: {
        color: '#0891b2',
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 4,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    username: {
        marginRight: 12,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
    },
    meta: {
        marginRight: 12,
        fontSize: 12,
        color: '#64748B',
        textAlign: 'right',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'right',
    },
    content: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 20,
        textAlign: 'right',
    },
    footer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    stats: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    statText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '600',
        marginRight: 6,
    },
    likeButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    likedButton: {
        backgroundColor: '#FEE2E2',
    },
    likedText: {
        color: '#DC2626',
    }
});

export default PostCard;
