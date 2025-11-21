import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import type { JobPosting } from '@helio/shared-logic';
import { MapPinIcon } from '../Icons';

const JobPostingCard: React.FC<{ job: JobPosting }> = ({ job }) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerText}>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.company}>{job.companyName}</Text>
            </View>
            <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{job.type}</Text>
            </View>
        </View>
        <Text style={styles.description} numberOfLines={3}>{job.description}</Text>
        <View style={styles.footer}>
            <View style={styles.location}>
                <MapPinIcon color="#64748B" width={14} height={14} />
                <Text style={styles.locationText}>{job.location}</Text>
            </View>
            <Text style={styles.dateText}>{new Date(job.creationDate).toLocaleDateString('ar-EG-u-nu-latn')}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 2,
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0891b2',
        textAlign: 'right',
    },
    company: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'right',
    },
    typeBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#475569',
    },
    description: {
        fontSize: 14,
        color: '#475569',
        textAlign: 'right',
        marginVertical: 12,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    location: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 12,
        color: '#64748B',
        marginLeft: 4,
    },
    dateText: {
        fontSize: 12,
        color: '#64748B',
    },
});

export default JobPostingCard;
