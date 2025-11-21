import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface FieldProps extends TextInputProps {
    label: string;
    error?: string;
}

export const InputField: React.FC<FieldProps> = ({ label, error, style, ...props }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={[styles.input, style, error ? styles.inputError : null]} {...props} />
        {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
);

export const TextareaField: React.FC<FieldProps> = ({ label, error, style, ...props }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={[styles.input, styles.textarea, style, error ? styles.inputError : null]} multiline {...props} />
        {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#334155',
        marginBottom: 8,
        textAlign: 'right',
    },
    input: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        textAlign: 'right',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    textarea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'right',
    }
});
