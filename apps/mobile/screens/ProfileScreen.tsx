
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '@helio/shared-logic';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const { currentPublicUser, publicLogout } = useAuth();
  const navigation = useNavigation<any>();

  if (!currentPublicUser) {
      return (
          <SafeAreaView style={styles.container}>
              <View style={styles.centerContent}>
                  <Text style={styles.welcomeText}>مرحباً بك في هيليو</Text>
                  <Text style={styles.subText}>يرجى تسجيل الدخول للوصول إلى ملفك الشخصي.</Text>
                  <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.buttonText}>تسجيل الدخول</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                      <Text style={styles.linkText}>إنشاء حساب جديد</Text>
                  </TouchableOpacity>
              </View>
          </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
              <Image source={{ uri: currentPublicUser.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{currentPublicUser.name}</Text>
              <Text style={styles.email}>{currentPublicUser.email}</Text>
          </View>

          <View style={styles.section}>
              <Text style={styles.sectionTitle}>معلوماتي</Text>
              <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>تاريخ الانضمام</Text>
                  <Text style={styles.infoValue}>{currentPublicUser.joinDate}</Text>
              </View>
              <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>نوع الحساب</Text>
                  <Text style={styles.infoValue}>{currentPublicUser.role === 'service_provider' ? 'مقدم خدمة' : 'مستخدم'}</Text>
              </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={publicLogout}>
              <Text style={styles.logoutText}>تسجيل الخروج</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  scrollContent: {
      padding: 20,
  },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subText: { fontSize: 16, color: 'gray', marginBottom: 30, textAlign: 'center' },
  loginButton: { backgroundColor: '#0891b2', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#0891b2', fontSize: 16 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold' },
  email: { fontSize: 14, color: 'gray' },
  section: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'right' },
  infoRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  infoLabel: { color: 'gray' },
  infoValue: { fontWeight: '600' },
  logoutButton: { backgroundColor: '#FEE2E2', padding: 15, borderRadius: 10, alignItems: 'center' },
  logoutText: { color: '#DC2626', fontWeight: 'bold' }
});

export default ProfileScreen;
