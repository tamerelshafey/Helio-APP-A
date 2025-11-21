import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PlusIcon, TrashIcon } from '../Icons';

interface ImageUploaderProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxFiles?: number;
    multiple?: boolean;
    label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onImagesChange, maxFiles = 1, multiple = false, label="Image" }) => {
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: !multiple,
            quality: 1,
            allowsMultipleSelection: multiple,
        });

        if (!result.canceled) {
            const newImages = result.assets.map(asset => asset.uri);
            if (multiple) {
                onImagesChange([...images, ...newImages].slice(0, maxFiles));
            } else {
                onImagesChange(newImages);
            }
        }
    };

    const removeImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                {images.map((uri, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri }} style={styles.image} />
                        <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index)}>
                            <TrashIcon color="#fff" width={16} height={16} />
                        </TouchableOpacity>
                    </View>
                ))}
                {images.length < maxFiles && (
                    <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                        <PlusIcon color="#64748B" width={24} height={24} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row-reverse', flexWrap: 'wrap' },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#334155',
      marginBottom: 8,
      textAlign: 'right',
    },
    imageContainer: { width: 80, height: 80, borderRadius: 8, margin: 4 },
    image: { width: '100%', height: '100%', borderRadius: 8 },
    deleteButton: { position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(239, 68, 68, 0.8)', borderRadius: 12, padding: 4 },
    addButton: { width: 80, height: 80, borderRadius: 8, margin: 4, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1', borderStyle: 'dashed' },
});

export default ImageUploader;
