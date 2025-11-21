import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Linking, TouchableOpacity, Platform } from 'react-native';
import { useServices } from '@helio/shared-logic';
import { PhoneIcon, ChatBubbleOvalLeftEllipsisIcon, MapPinIcon, StarIcon } from '../components/Icons';

const ServiceDetailScreen: React.FC<{ route: any }> = ({ route }) => {
    const { serviceId } = route.params;
    const { services } = useServices();
    const service = useMemo(() => services.find(s => s.id === serviceId), [services, serviceId]);

    const handleCall = (number: string) => Linking.openURL(`tel:${number}`);
    const handleWhatsApp = (number: string) => Linking.openURL(`https://wa.me/${number}`);
    const handleMap = (url: string) => Linking.openURL(url);

    if (!service) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}><Text>لم يتم العثور على الخدمة</Text></View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={{ uri: service.images[0] || `https://picsum.photos/400/300?random=${service.id}` }} style={styles.headerImage} />
                <View style={styles.content}>
                    <Text style={styles.title}>{service.name}</Text>
                    <Text style={styles.address}>{service.address}</Text>
                    
                    <View style={styles.ratingContainer}>
                        <StarIcon width={20} height={20} color="#FBBF24" />
                        <Text style={styles.ratingText}>{service.rating.toFixed(1)} ({service.reviews.length} تقييم)</Text>
                    </View>
                    
                    <Text style={styles.sectionTitle}>حول الخدمة</Text>
                    <Text style={styles.about}>{service.about}</Text>

                    <View style={styles.actionsContainer}>
                        {service.phone.map((p, i) => <ActionButton key={`p-${i}`} icon={<PhoneIcon color="#fff" />} text={`اتصال ${service.phone.length > 1 ? i+1 : ''}`} onPress={() => handleCall(p)} color="#22C55E" />)}
                        {service.whatsapp.map((w, i) => <ActionButton key={`w-${i}`} icon={<ChatBubbleOvalLeftEllipsisIcon color="#fff" />} text="واتساب" onPress={() => handleWhatsApp(w)} color="#10B981" />)}
                        {service.locationUrl && <ActionButton icon={<MapPinIcon color="#fff" />} text="عرض على الخريطة" onPress={() => handleMap(service.locationUrl!)} color="#3B82F6" />}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const ActionButton: React.FC<{ icon: React.ReactNode; text: string; onPress: () => void; color: string; }> = ({ icon, text, onPress, color }) => (
    <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
        {icon}
        <Text style={styles.actionButtonText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerImage: { width: '100%', height: 250 },
    content: { padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'right', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium' },
    address: { fontSize: 16, color: '#64748B', textAlign: 'right', marginTop: 4 },
    ratingContainer: { flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 12 },
    ratingText: { marginLeft: 8, fontWeight: 'bold' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginTop: 24, marginBottom: 8 },
    about: { fontSize: 16, lineHeight: 24, textAlign: 'right' },
    actionsContainer: { marginTop: 24, gap: 12 },
    actionButton: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12 },
    actionButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
});

export default ServiceDetailScreen;
