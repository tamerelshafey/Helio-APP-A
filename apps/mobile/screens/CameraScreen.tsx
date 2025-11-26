
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
// Note: To use expo-camera, run: npx expo install expo-camera
// Importing it here without installation might cause build errors in managed workflow if not configured.
// For this demonstration, we'll create a UI that simulates the camera view request.

const CameraScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.text}>الكاميرا غير مفعلة في وضع المعاينة</Text>
        <Text style={styles.subText}>يرجى استخدام جهاز حقيقي لتجربة الكاميرا.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>العودة</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  subText: { color: '#ccc', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#0891b2', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default CameraScreen;
