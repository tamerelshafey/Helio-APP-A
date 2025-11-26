
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch } from 'react-native';

const NotificationSettingsScreen: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [offersEnabled, setOffersEnabled] = useState(true);

  const SettingRow = ({ label, value, onValueChange }: { label: string, value: boolean, onValueChange: (val: boolean) => void }) => (
    <View style={styles.settingRow}>
        <Text style={styles.settingText}>{label}</Text>
        <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: "#CBD5E1", true: "#A5F3FC" }}
            thumbColor={value ? "#0891b2" : "#f4f3f4"}
        />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>إعدادات الإشعارات</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionHeader}>التفضيلات العامة</Text>
        <SettingRow label="إشعارات التطبيق (Push)" value={pushEnabled} onValueChange={setPushEnabled} />
        <SettingRow label="إشعارات البريد الإلكتروني" value={emailEnabled} onValueChange={setEmailEnabled} />
        
        <Text style={[styles.sectionHeader, { marginTop: 24 }]}>أنواع التنبيهات</Text>
        <SettingRow label="عروض وخصومات جديدة" value={offersEnabled} onValueChange={setOffersEnabled} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', color: '#0F172A' },
  content: { padding: 20 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#64748B', textAlign: 'right', marginBottom: 12, textTransform: 'uppercase' },
  settingRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  settingText: { fontSize: 16, color: '#1E293B' }
});

export default NotificationSettingsScreen;
