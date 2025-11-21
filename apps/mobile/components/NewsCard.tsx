import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import type { News } from '@helio/shared-logic';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.7;

interface NewsCardProps {
  newsItem: News;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: newsItem.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.date}>{new Date(newsItem.date).toLocaleDateString('ar-EG-u-nu-latn')} • {newsItem.author}</Text>
        <Text style={styles.title} numberOfLines={2}>{newsItem.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginLeft: 16,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  date: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
});

export default NewsCard;
