import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, MD3Theme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';
import useCachedResources from './src/hooks/useCachedResources';
import { AuthProvider } from './src/context/AuthContext';

declare global {
  namespace ReactNativePaper {
    interface Theme extends MD3Theme {
      custom: {
        colors: typeof theme.custom.colors;
        typography: typeof theme.custom.typography;
        spacing: typeof theme.custom.spacing;
        borderRadius: typeof theme.custom.borderRadius;
        elevation: typeof theme.custom.elevation;
      };
    }
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="dark" backgroundColor={theme.colors.background as string} />
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}