import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceListScreen from '../screens/ServiceListScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import PropertiesScreen from '../screens/PropertiesScreen';
import PropertyDetailScreen from '../screens/PropertyDetailScreen';
import CommunityScreen from '../screens/CommunityScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import NewsScreen from '../screens/NewsScreen';

import { HomeIcon, Squares2X2Icon, HomeModernIcon, ChatBubbleOvalLeftEllipsisIcon, ShieldExclamationIcon, UserCircleIcon, NewspaperIcon } from '../components/Icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
    headerStyle: {
        backgroundColor: '#FFFFFF',
    },
    headerTintColor: '#0F172A',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    },
    headerTitleAlign: 'center',
    headerBackTitle: 'رجوع',
};

const HomeNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'الرئيسية' }} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: 'تفاصيل الخبر' }} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} options={({ route }) => ({ title: (route.params as any)?.propertyTitle || 'تفاصيل العقار' })} />
    </Stack.Navigator>
);

const ServicesNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="ServicesCategories" component={ServicesScreen} options={{ title: 'فئات الخدمات' }} />
        <Stack.Screen name="ServiceList" component={ServiceListScreen} options={({ route }) => ({ title: (route.params as any)?.subCategoryName })} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={({ route }) => ({ title: (route.params as any)?.serviceName })} />
    </Stack.Navigator>
);

const PropertiesNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="PropertiesMain" component={PropertiesScreen} options={{ title: 'العقارات' }} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} options={({ route }) => ({ title: (route.params as any)?.propertyTitle || 'تفاصيل العقار' })} />
    </Stack.Navigator>
);

const NewsNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="NewsMain" component={NewsScreen} options={{ title: 'الأخبار' }} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={({ route }) => ({ title: (route.params as any)?.newsTitle || 'تفاصيل الخبر' })} />
    </Stack.Navigator>
);


const CommunityNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="CommunityMain" component={CommunityScreen} options={{ title: 'المجتمع' }} />
    </Stack.Navigator>
);

const EmergencyNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="EmergencyMain" component={EmergencyScreen} options={{ title: 'أرقام الطوارئ' }} />
    </Stack.Navigator>
);


const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    const iconProps = { color, width: size, height: size };
                    if (route.name === 'HomeTab') return <HomeIcon {...iconProps} />;
                    if (route.name === 'ServicesTab') return <Squares2X2Icon {...iconProps} />;
                    if (route.name === 'PropertiesTab') return <HomeModernIcon {...iconProps} />;
                    if (route.name === 'NewsTab') return <NewspaperIcon {...iconProps} />;
                    if (route.name === 'EmergencyTab') return <ShieldExclamationIcon {...iconProps} />;
                    return null;
                },
                tabBarActiveTintColor: '#0891b2',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopColor: '#E2E8F0',
                },
                tabBarLabelStyle: {
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                    fontSize: 10,
                }
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: 'الرئيسية' }} />
            <Tab.Screen name="ServicesTab" component={ServicesNavigator} options={{ title: 'الخدمات' }} />
            <Tab.Screen name="PropertiesTab" component={PropertiesNavigator} options={{ title: 'العقارات' }} />
            <Tab.Screen name="NewsTab" component={NewsNavigator} options={{ title: 'الأخبار' }} />
            <Tab.Screen name="EmergencyTab" component={EmergencyNavigator} options={{ title: 'الطوارئ' }} />
        </Tab.Navigator>
    );
};

export default AppNavigator;