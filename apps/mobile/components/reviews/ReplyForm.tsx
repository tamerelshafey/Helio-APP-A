import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import type { Review } from '@helio/shared-logic';

interface ReplyFormProps {
    review: Review;
    onSave: (reply: string) => void;
    onClose: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ review, onSave, onClose }) => {
    const [reply, setReply] = useState(review.adminReply || '');
    
    const handleSubmit = () => {
        onSave(reply);
    };

    return (
        <View>
            <TextInput
                value={reply}
                onChangeText={setReply}
                multiline
                numberOfLines={4}
                style={styles.textarea}
                placeholder="اكتب ردك هنا..."
            />
            <View style={styles.buttons}>
                <Button title="إلغاء" onPress={onClose} color="#64748B" />
                <Button title="حفظ الرد" onPress={handleSubmit} disabled={!reply.trim()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textarea: {
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top',
        textAlign: 'right',
    },
    buttons: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginTop: 16,
    }
});

export default ReplyForm;
