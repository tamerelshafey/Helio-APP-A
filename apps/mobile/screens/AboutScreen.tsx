import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useData, CONTACT_INFO } from '@helio/shared-logic';
import { InformationCircleIcon, PhoneIcon } from '../components/Icons';

const AboutScreen: React.FC = () => {
    const { publicPagesContent } = useData();
    const { about } = publicPagesContent;

    const handleWhatsApp = () => Linking.openURL(CONTACT_INFO.WHATSAPP_LINK);
    const handleEmail = () => Linking.openURL(`mailto:${CONTACT_INFO.EMAIL}`);

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.title}>عن التطبيق</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <InformationCircleIcon color="#0891b2" width={48} height={48} style={{alignSelf: 'center', marginBottom: 16}}/>
                    <Text style={styles.appTitle}>{about.title}</Text>
                    <Text style={styles.intro}>{about.intro}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{about.vision.title}</Text>
                    <Text style={styles.cardText}>{about.vision.text}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{about.mission.title}</Text>
                    <Text style={styles.cardText}>{about.mission.text}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>تواصل معنا</Text>
                    <View style={styles.contactButtons}>
                         <TouchableOpacity style={[styles.button, { backgroundColor: '#22C55E' }]} onPress={handleWhatsApp}>
                            <PhoneIcon color="#fff" width={20} height={20} />
                            <Text style={styles.buttonText}>واتساب</Text>
                        </TouchableOpacity>
                         <TouchableOpacity style={[styles.button, { backgroundColor: '#0891b2' }]} onPress={handleEmail}>
                            <Text style={styles.buttonText}>البريد الإلكتروني</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                 <Text style={styles.copyright}>© {new Date().getFullYear()} Helio APP. جميع الحقوق محفوظة.</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', color: '#0F172A' },
    content: { padding: 20 },
    section: { marginBottom: 24 },
    appTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#0F172A', marginBottom: 12 },
    intro: { fontSize: 16, textAlign: 'center', color: '#475569', lineHeight: 24 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', color: '#0891b2', marginBottom: 8 },
    cardText: { fontSize: 15, textAlign: 'right', color: '#334155', lineHeight: 22 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#334155' },
    contactButtons: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 12 },
    button: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, gap: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    copyright: { textAlign: 'center', color: '#94A3B8', marginTop: 20, fontSize: 12 }
});

export default AboutScreen;
