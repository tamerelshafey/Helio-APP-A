
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
import PostDetailScreen from '../screens/PostDetailScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';

// New Screens
import MyBusinessScreen from '../screens/MyBusinessScreen';
import MyOffersScreen from '../screens/MyOffersScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserNotificationsScreen from '../screens/UserNotificationsScreen';
import CameraScreen from '../screens/CameraScreen';
import TransportationScreen from '../screens/TransportationScreen';
import CityServicesGuideScreen from '../screens/CityServicesGuideScreen';
import AboutScreen from '../screens/AboutScreen';


import { HomeIcon, Squares2X2Icon, HomeModernIcon, ChatBubbleOvalLeftEllipsisIcon, ShieldExclamationIcon, UserCircleIcon } from '../components/Icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
    headerStyle: { backgroundColor: '#FFFFFF' },
    headerTintColor: '#0F172A',
    headerTitleStyle: { fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium' },
    headerTitleAlign: 'center' as const,
};

const HomeNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'الرئيسية' }} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: 'تفاصيل الخبر' }} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} options={({ route }) => ({ title: (route.params as any)?.propertyTitle || 'تفاصيل العقار' })} />
        <Stack.Screen name="Transportation" component={TransportationScreen} options={{ title: 'دليل المواصلات' }} />
        <Stack.Screen name="CityServicesGuide" component={CityServicesGuideScreen} options={{ title: 'دليل خدمات المدينة' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'عن التطبيق' }} />
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

const CommunityNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="CommunityMain" component={CommunityScreen} options={{ title: 'المجتمع' }} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'تفاصيل المنشور' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
    </Stack.Navigator>
);

const EmergencyNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="EmergencyMain" component={EmergencyScreen} options={{ title: 'أرقام الطوارئ' }} />
    </Stack.Navigator>
);

const ProfileNavigator = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'ملفي الشخصي' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'إنشاء حساب' }} />
        <Stack.Screen name="MyBusiness" component={MyBusinessScreen} options={{ title: 'إدارة أعمالي' }} />
        <Stack.Screen name="MyOffers" component={MyOffersScreen} options={{ title: 'عروضي' }} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ title: 'إعدادات الإشعارات' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'المفضلة' }} />
        <Stack.Screen name="UserNotifications" component={UserNotificationsScreen} options={{ title: 'الإشعارات' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'الكاميرا' }} />
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
                    if (route.name === 'CommunityTab') return <ChatBubbleOvalLeftEllipsisIcon {...iconProps} />;
                    if (route.name === 'EmergencyTab') return <ShieldExclamationIcon {...iconProps} />;
                    if (route.name === 'ProfileTab') return <UserCircleIcon {...iconProps} />;
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
            <Tab.Screen name="CommunityTab" component={CommunityNavigator} options={{ title: 'المجتمع' }} />
            <Tab.Screen name="EmergencyTab" component={EmergencyNavigator} options={{ title: 'الطوارئ' }} />
            <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{ title: 'حسابي' }} />
        </Tab.Navigator>
    );
};

export default AppNavigator;
