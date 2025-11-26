
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { useAuth } from '@helio/shared-logic';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { publicLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const success = publicLogin(email, password);
        if (success) {
            // In a real app, you might navigate differently based on role
            // For now, we go to a generic profile/home tab
            navigation.navigate('HomeTab');
        } else {
            // Toast is handled in context, but we can add a native alert as well
            Alert.alert("فشل الدخول", "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>تسجيل الدخول</Text>
                <TextInput
                    style={styles.input}
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="كلمة المرور"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>دخول</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>ليس لديك حساب؟ أنشئ واحداً</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    content: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium', },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#0891b2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#0891b2',
        textAlign: 'center',
    }
});

export default LoginScreen;
