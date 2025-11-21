import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useCommunity } from '@helio/shared-logic';
import type { JobPosting } from '@helio/shared-logic';
import { BriefcaseIcon, MapPinIcon } from '../Icons';
// import EmptyState from '../common/EmptyState';
import JobPostingCard from './JobPostingCard';

const JobsTab: React.FC = () => {
    const { jobPostings } = useCommunity();
    const [searchTerm, setSearchTerm] = useState('');

    const approvedJobs = useMemo(() => {
        return jobPostings
            .filter(job => job.status === 'approved')
            .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [jobPostings, searchTerm]);

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.searchInput}
                placeholder="ابحث عن وظيفة أو شركة..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            {approvedJobs.length > 0 ? (
                <FlatList
                    data={approvedJobs}
                    renderItem={({ item }) => <JobPostingCard job={item} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <BriefcaseIcon width={64} height={64} color="#9ca3af" />
                    <Text style={styles.emptyTitle}>لا توجد وظائف متاحة حالياً</Text>
                    <Text style={styles.emptyMessage}>سيتم عرض الوظائف هنا عند توفرها.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        margin: 10,
        textAlign: 'right'
    },
    list: {
        paddingHorizontal: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptyMessage: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 8,
        textAlign: 'center',
    },
});

export default JobsTab;
