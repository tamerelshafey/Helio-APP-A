import React from 'react';
import { SectionList, View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useServices } from '@helio/shared-logic';
import { getIcon } from '../components/iconUtils';

const ServicesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { categories } = useServices();
    const serviceSections = categories
        .filter(cat => cat.name !== "المدينة والجهاز")
        .map(cat => ({
            title: cat.name,
            icon: cat.icon,
            data: cat.subCategories,
        }));

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={serviceSections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ServiceList', { subCategoryId: item.id, subCategoryName: item.name })}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title, icon } }) => (
                    <View style={styles.sectionHeader}>
                        {getIcon(icon, { width: 24, height: 24, color: '#0891b2' })}
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    listContent: {
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#F8FAFC',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
        marginRight: 12,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    },
    item: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 16,
        textAlign: 'right',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    },
});

export default ServicesScreen;
