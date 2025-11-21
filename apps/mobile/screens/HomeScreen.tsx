import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNews, useProperties } from '@helio/shared-logic';
// FIX: Correct import for NewsCard component
import NewsCard from '../components/NewsCard';
import PropertyCard from '../components/PropertyCard';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { news } = useNews();
  const { properties } = useProperties();

  const recentNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const recentProperties = [...properties].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>أهلاً بك في تطبيق هيليو</Text>
              <Text style={styles.subtitle}>دليلك الشامل لمدينة هليوبوليس الجديدة</Text>
            </View>

            <SectionHeader title="آخر الأخبار" />
            <FlatList
              data={recentNews}
              renderItem={({ item }) => <NewsCard newsItem={item} onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
              contentContainerStyle={styles.horizontalContent}
            />

            <SectionHeader title="أحدث العقارات" />
          </>
        }
        data={recentProperties}
        renderItem={({ item }) => <PropertyCard property={item} onPress={() => navigation.navigate('PropertyDetail', { propertyId: item.id })} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.propertyColumn}
        contentContainerStyle={styles.propertyList}
      />
    </SafeAreaView>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // slate-100
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A', // slate-900
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B', // slate-500
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'right',
  },
  horizontalList: {
    paddingHorizontal: 10,
  },
  horizontalContent: {
    paddingRight: 10,
  },
  propertyList: {
    paddingHorizontal: 10,
  },
  propertyColumn: {
    justifyContent: 'space-between',
  }
});

export default HomeScreen;
