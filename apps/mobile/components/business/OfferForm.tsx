import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ExclusiveOffer, Service } from '@helio/shared-logic';
import { InputField, TextareaField } from '../common/FormControls';
import ImageUploader from '../common/ImageUploader';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

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
    const [image, setImage] = useState<string[]>(offer?.imageUrl ? [offer.imageUrl] : []);

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (image.length === 0) { alert('الرجاء إضافة صورة للعرض.'); return; }
        if (!formData.serviceId) { alert('الرجاء اختيار الخدمة المرتبطة بالعرض.'); return; }
        
        onSave({
            id: offer?.id,
            ...formData,
            serviceId: Number(formData.serviceId),
            imageUrl: image[0],
        });
    };

    return (
        <View style={styles.container}>
            <ImageUploader images={image} onImagesChange={setImage} maxFiles={1} />
            {/* FIX: Removed unsupported 'name' prop */}
            <InputField label="عنوان العرض" value={formData.title} onChangeText={text => handleChange('title', text)} />
            {/* FIX: Removed unsupported 'name' prop */}
            <TextareaField label="وصف العرض" value={formData.description} onChangeText={text => handleChange('description', text)} />
            <Text style={styles.label}>الخدمة المرتبطة</Text>
            <Picker
                selectedValue={formData.serviceId}
                onValueChange={(itemValue) => handleChange('serviceId', itemValue)}
                style={styles.picker}
            >
                {services.map(s => <Picker.Item key={s.id} label={s.name} value={s.id} />)}
            </Picker>
            {/* FIX: Removed unsupported 'name' prop */}
            <InputField label="كود الخصم (اختياري)" value={formData.promoCode} onChangeText={text => handleChange('promoCode', text)} />
            {/* FIX: Removed unsupported 'name' prop */}
            <InputField label="تاريخ البدء" value={formData.startDate} onChangeText={text => handleChange('startDate', text)} />
            {/* FIX: Removed unsupported 'name' prop */}
            <InputField label="تاريخ الانتهاء" value={formData.endDate} onChangeText={text => handleChange('endDate', text)} />
            <View style={styles.buttons}>
                <Button onPress={onClose}>إلغاء</Button>
                <Button mode="contained" onPress={handleSubmit}>إرسال للمراجعة</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'right'
    },
    picker: {
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    }
});

export default OfferForm;