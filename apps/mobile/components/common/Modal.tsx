import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { XMarkIcon } from '../Icons';

interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <Pressable style={styles.centeredView} onPress={onClose}>
                <Pressable style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <XMarkIcon color="#64748B" width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalView: { width: '90%', maxHeight: '80%', backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 10, marginBottom: 15 },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    closeButton: {
        padding: 5,
    }
});

export default AppModal;
