
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useData } from '@helio/shared-logic';
import { DocumentDuplicateIcon, ChevronDownIcon } from '../components/Icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CityServicesGuideScreen: React.FC = () => {
    const { serviceGuides } = useData();
    const [openGuideId, setOpenGuideId] = useState<number | null>(null);

    const toggleGuide = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenGuideId(openGuideId === id ? null : id);
    };

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.title}>دليل خدمات الجهاز</Text>
                <Text style={styles.subtitle}>خطوات ومستندات الخدمات الحكومية</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {serviceGuides.map(guide => {
                    const isOpen = openGuideId === guide.id;
                    return (
                        <View key={guide.id} style={styles.card}>
                            <TouchableOpacity style={styles.cardHeader} onPress={() => toggleGuide(guide.id)}>
                                <View style={styles.titleContainer}>
                                    <DocumentDuplicateIcon color="#0891b2" width={24} height={24} />
                                    <Text style={styles.cardTitle}>{guide.title}</Text>
                                </View>
                                <ChevronDownIcon 
                                    color="#64748B" 
                                    width={20} 
                                    height={20} 
                                    style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }} 
                                />
                            </TouchableOpacity>
                            
                            {isOpen && (
                                <View style={styles.cardBody}>
                                    <View style={styles.section}>
                                        <Text style={styles.sectionHeader}>خطوات التقديم</Text>
                                        {guide.steps.map((step, index) => (
                                            <Text key={index} style={styles.listItem}>{index + 1}. {step}</Text>
                                        ))}
                                    </View>
                                    <View style={styles.section}>
                                        <Text style={styles.sectionHeader}>الأوراق المطلوبة</Text>
                                        {guide.documents.map((doc, index) => (
                                            <Text key={index} style={styles.listItem}>• {doc}</Text>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', color: '#0F172A' },
    subtitle: { fontSize: 14, color: '#64748B', textAlign: 'right', marginTop: 4 },
    content: { padding: 16 },
    card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    titleContainer: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10, flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#0F172A', textAlign: 'right', flex: 1 },
    cardBody: { padding: 16, paddingTop: 0, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
    section: { marginTop: 16 },
    sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#0891b2', textAlign: 'right', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E0F2FE', paddingBottom: 4 },
    listItem: { fontSize: 14, color: '#475569', textAlign: 'right', marginBottom: 4, lineHeight: 20 },
});

export default CityServicesGuideScreen;
