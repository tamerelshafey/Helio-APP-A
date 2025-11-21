import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { useAuth } from '@helio/shared-logic';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (password.length < 6) {
            Alert.alert("خطأ", "يجب أن تكون كلمة المرور 6 أحرف على الأقل.");
            return;
        }
        const success = register({ name, email, password });
        if (success) {
            navigation.navigate('HomeTab');
        } else {
            // Error toast is handled in context
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>إنشاء حساب</Text>
                <TextInput
                    style={styles.input}
                    placeholder="الاسم الكامل"
                    value={name}
                    onChangeText={setName}
                />
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
                    placeholder="كلمة المرور (6 حروف على الأقل)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>إنشاء حساب</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>لديك حساب بالفعل؟ سجل الدخول</Text>
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

export default RegisterScreen;
