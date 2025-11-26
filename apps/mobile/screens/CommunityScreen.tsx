
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import CommunityFeedTab from '../components/community/CommunityFeedTab';
import MarketplaceTab from '../components/community/MarketplaceTab';
import JobsTab from '../components/community/JobsTab';
import LostAndFoundTab from '../components/community/LostAndFoundTab';

const CommunityScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'marketplace' | 'jobs' | 'lost'>('feed');

  const renderContent = () => {
      switch(activeTab) {
          case 'feed': return <CommunityFeedTab />;
          case 'marketplace': return <MarketplaceTab />;
          case 'jobs': return <JobsTab />;
          case 'lost': return <LostAndFoundTab />;
          default: return null;
      }
  };

  const TabButton = ({ id, title }: { id: string, title: string }) => (
      <TouchableOpacity 
        style={[styles.tab, activeTab === id && styles.activeTab]} 
        onPress={() => setActiveTab(id as any)}
      >
          <Text style={[styles.tabText, activeTab === id && styles.activeTabText]}>{title}</Text>
      </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TabButton id="feed" title="المنشورات" />
        <TabButton id="marketplace" title="السوق" />
        <TabButton id="jobs" title="الوظائف" />
        <TabButton id="lost" title="المفقودات" />
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  tabsContainer: {
      flexDirection: 'row-reverse',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
  },
  tab: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 4,
      borderRadius: 20,
      backgroundColor: '#f1f5f9',
  },
  activeTab: {
      backgroundColor: '#0891b2',
  },
  tabText: {
      color: '#64748B',
      fontWeight: '600',
      fontSize: 12,
  },
  activeTabText: {
      color: '#fff',
  },
  content: {
      flex: 1,
  }
});

export default CommunityScreen;
