import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Helio</Text>
      <ActivityIndicator size="large" color="#0891b2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 20,
  },
});

export default SplashScreen;
