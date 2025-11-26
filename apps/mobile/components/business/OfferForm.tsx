
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { ExclusiveOffer, Service } from '@helio/shared-logic';
import { InputField, TextareaField } from '../common/FormControls';

const OfferForm: React.FC<{
    onClose: () => void;
    onSave: (data: any) => void;
    services: Service[];
    offer: ExclusiveOffer | null;
}> = ({ onClose, onSave, services, offer }) => {
    const [formData, setFormData] = useState({
        title: offer?.title || '',
        description: offer?.description || '',
        serviceId: offer?.serviceId || (services.length > 0 ? services[0].id : ''),
        promoCode: offer?.promoCode || '',
        startDate: offer?.startDate || new Date().toISOString().split('T')[0],
        endDate: offer?.endDate || new Date().toISOString().split('T')[0],
    });

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.serviceId) { alert('الرجاء اختيار الخدمة المرتبطة بالعرض.'); return; }
        
        onSave({
            id: offer?.id,
            ...formData,
            serviceId: Number(formData.serviceId),
            imageUrl: offer?.imageUrl || 'https://picsum.photos/200/300', // Placeholder
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <InputField label="عنوان العرض" value={formData.title} onChangeText={text => handleChange('title', text)} />
            <TextareaField label="وصف العرض" value={formData.description} onChangeText={text => handleChange('description', text)} />
            
            <Text style={styles.label}>الخدمة المرتبطة</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={formData.serviceId}
                    onValueChange={(itemValue) => handleChange('serviceId', itemValue)}
                    style={Platform.OS === 'ios' ? {} : styles.picker}
                >
                    {services.map(s => <Picker.Item key={s.id} label={s.name} value={s.id} />)}
                </Picker>
            </View>

            <InputField label="كود الخصم (اختياري)" value={formData.promoCode} onChangeText={text => handleChange('promoCode', text)} />
            
            <View style={styles.row}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <InputField label="تاريخ الانتهاء" value={formData.endDate} onChangeText={text => handleChange('endDate', text)} placeholder="YYYY-MM-DD" />
                </View>
                <View style={{ flex: 1 }}>
                    <InputField label="تاريخ البدء" value={formData.startDate} onChangeText={text => handleChange('startDate', text)} placeholder="YYYY-MM-DD" />
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>إلغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.submitText}>حفظ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    label: { fontSize: 14, fontWeight: '500', color: '#334155', marginBottom: 8, textAlign: 'right' },
    pickerContainer: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, marginBottom: 16, backgroundColor: '#F1F5F9', overflow: 'hidden' },
    picker: { height: 50 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 10 },
    cancelButton: { flex: 1, padding: 15, borderRadius: 8, backgroundColor: '#F1F5F9', alignItems: 'center' },
    cancelText: { color: '#64748B', fontWeight: 'bold' },
    submitButton: { flex: 1, padding: 15, borderRadius: 8, backgroundColor: '#0891b2', alignItems: 'center' },
    submitText: { color: '#fff', fontWeight: 'bold' }
});

export default OfferForm;
