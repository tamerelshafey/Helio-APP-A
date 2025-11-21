import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Linking, Platform } from 'react-native';
import { useNews } from '@helio/shared-logic';

const NewsDetailScreen: React.FC<{ route: any }> = ({ route }) => {
    const { newsId } = route.params;
    const { news } = useNews();
    const newsItem = useMemo(() => news.find(n => n.id === newsId), [news, newsId]);

    if (!newsItem) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}><Text>لم يتم العثور على الخبر</Text></View>
            </SafeAreaView>
        );
    }
    
    const formattedDate = new Date(newsItem.date).toLocaleDateString('ar-EG-u-nu-latn', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={{ uri: newsItem.imageUrl }} style={styles.headerImage} />
                <View style={styles.content}>
                    <Text style={styles.title}>{newsItem.title}</Text>
                    <View style={styles.metaContainer}>
                         <Text style={styles.metaText}>بواسطة {newsItem.author}</Text>
                         <Text style={styles.metaText}>{formattedDate}</Text>
                    </View>
                    <Text style={styles.body}>{newsItem.content}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerImage: { width: '100%', height: 250 },
    content: { padding: 20 },
    title: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        textAlign: 'right', 
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
        marginBottom: 8,
    },
    metaContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 8,
    },
    metaText: {
        fontSize: 14,
        color: '#64748B',
    },
    body: { 
        fontSize: 17, 
        lineHeight: 28, 
        textAlign: 'right' 
    },
});

export default NewsDetailScreen;
