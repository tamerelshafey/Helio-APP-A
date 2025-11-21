import React, { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nManager, View, StyleSheet } from 'react-native';
import { AppProvider } from '@helio/shared-logic';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Force RTL layout for the app
try {
  if (!I18nManager.isRTL) {
    I18nManager.forceRTL(true);
    // On native, this requires a reload. In Expo Go, it might work instantly.
  }
} catch (e) {
  console.error('Failed to force RTL:', e);
}

const App = () => {
  const [fontsLoaded] = useFonts({
    // In a real app, you would load custom fonts here.
    // This is a placeholder to simulate an async asset loading.
    'App-Regular': 'https://rsms.me/inter/font-files/Inter-Regular.otf?v=3.19',
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // the app is ready, we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading and splash screen is visible
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AppProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AppProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
