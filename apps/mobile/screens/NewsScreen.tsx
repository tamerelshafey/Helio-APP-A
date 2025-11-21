import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { useNews } from '@helio/shared-logic';
import type { News } from '@helio/shared-logic';

const NewsListItem: React.FC<{ newsItem: News; onPress: () => void; }> = ({ newsItem, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: newsItem.imageUrl }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.date}>{new Date(newsItem.date).toLocaleDateString('ar-EG-u-nu-latn')} • {newsItem.author}</Text>
                <Text style={styles.title} numberOfLines={2}>{newsItem.title}</Text>
                <Text style={styles.content} numberOfLines={2}>{newsItem.content}</Text>
            </View>
        </TouchableOpacity>
    );
}

const NewsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { news } = useNews();
  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedNews}
        renderItem={({ item }) => (
            <NewsListItem 
                newsItem={item} 
                onPress={() => navigation.navigate('NewsDetail', { newsId: item.id, newsTitle: item.title })} 
            />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // slate-100
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  date: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  content: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'right',
    lineHeight: 20,
  }
});

export default NewsScreen;
