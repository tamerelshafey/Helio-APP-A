import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useProperties } from '@helio/shared-logic';
import PropertyCard from '../components/PropertyCard';

const PropertiesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { properties } = useProperties();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={properties}
        renderItem={({ item }) => (
            <PropertyCard 
                property={item} 
                onPress={() => navigation.navigate('PropertyDetail', { propertyId: item.id, propertyTitle: item.title })} 
            />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.column}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  list: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  column: {
    justifyContent: 'space-between',
  }
});

export default PropertiesScreen;
