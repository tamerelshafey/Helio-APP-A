import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ListingStatus, UserStatus } from '@helio/shared-logic';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '../Icons';

interface StatusBadgeProps {
    status: ListingStatus | UserStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusMap = {
        // ListingStatus
        pending: { text: 'قيد المراجعة', color: '#D97706', bgColor: '#FEF3C7', icon: <ClockIcon color="#D97706" /> },
        approved: { text: 'مقبول', color: '#059669', bgColor: '#D1FAE5', icon: <CheckCircleIcon color="#059669" /> },
        rejected: { text: 'مرفوض', color: '#DC2626', bgColor: '#FEE2E2', icon: <XCircleIcon color="#DC2626" /> },
        expired: { text: 'منتهي', color: '#475569', bgColor: '#F1F5F9', icon: <ClockIcon color="#475569" /> },
        // UserStatus
        active: { text: 'مفعل', color: '#059669', bgColor: '#D1FAE5', icon: <CheckCircleIcon color="#059669" /> },
        banned: { text: 'محظور', color: '#DC2626', bgColor: '#FEE2E2', icon: <XCircleIcon color="#DC2626" /> },
        deletion_requested: { text: 'طلب حذف', color: '#EA580C', bgColor: '#FFEDD5', icon: <ClockIcon color="#EA580C" /> },
    };
    
    // Choose the correct map entry, defaulting to a neutral style if status is unknown
    const displayInfo = statusMap[status as keyof typeof statusMap] || { 
        text: status, 
        color: '#475569', 
        bgColor: '#F1F5F9', 
        icon: <ClockIcon color="#475569"/> 
    };
    
    // FIX: Removed 'classes' from destructuring as it does not exist on displayInfo.
    const { icon } = displayInfo;

    return (
        <View style={[styles.badge, { backgroundColor: displayInfo.bgColor }]}>
            {React.cloneElement(icon, { width: 14, height: 14 })}
            <Text style={[styles.text, { color: displayInfo.color }]}>{displayInfo.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: { flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    text: { fontSize: 10, fontWeight: 'bold', marginRight: 4 },
});

export default StatusBadge;
