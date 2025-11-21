import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, SectionList, TouchableOpacity, Linking } from 'react-native';
import { useData } from '@helio/shared-logic';
import { PhoneIcon } from '../components/Icons';

const EmergencyScreen: React.FC = () => {
    const { emergencyContacts } = useData();

    const sections = [
        { title: 'أرقام خاصة بالمدينة', data: emergencyContacts.filter(c => c.type === 'city') },
        { title: 'أرقام قومية', data: emergencyContacts.filter(c => c.type === 'national') },
    ];

    const handleCall = (number: string) => {
        const phoneNumber = `tel:${number}`;
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (supported) {
                    return Linking.openURL(phoneNumber);
                } else {
                    console.log("Don't know how to open URI: " + phoneNumber);
                }
            })
            .catch(err => console.error('An error occurred', err));
    };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <View style={{flex: 1}}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemNumber}>{item.number}</Text>
                </View>
                <TouchableOpacity style={styles.callButton} onPress={() => handleCall(item.number)}>
                    <PhoneIcon color="#fff" width={24} height={24} />
                </TouchableOpacity>
            </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
      paddingHorizontal: 16,
      paddingBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'right',
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'right',
  },
  itemNumber: {
      fontSize: 18,
      color: '#0891b2',
      textAlign: 'right',
      fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
      marginTop: 4,
  },
  callButton: {
      backgroundColor: '#22C55E', // green-500
      padding: 12,
      borderRadius: 999,
  }
});

export default EmergencyScreen;
