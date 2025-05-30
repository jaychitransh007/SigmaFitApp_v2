import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuth } from '../context/AuthContext';

// Import screens
import LoginScreen from '../screens/Auth/LoginScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import ProfileSetupScreen from '../screens/Onboarding/ProfileSetup';
import GoalSettingScreen from '../screens/Onboarding/GoalSetting';
import HomeScreen from '../screens/Home/HomeScreen';

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  OTPVerification: { phoneNumber: string };
  ProfileSetup: undefined;
  GoalSetting: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const theme = useAppTheme();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // You can show a splash screen here
    return null;
  }

  const getInitialRouteName = (): keyof RootStackParamList => {
    if (!user) return 'Login';
    if (!user.hasProfile) return 'ProfileSetup';
    if (!user.hasGoals) return 'GoalSetting';
    return 'Home';
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.custom.colors.text.primary,
        headerTitleStyle: {
          fontFamily: theme.custom.typography.fontFamily.semiBold,
          fontSize: theme.custom.typography.sizes.bodyLarge,
        },
      }}
    >
      {!user ? (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="OTPVerification" 
            component={OTPVerificationScreen}
            options={{ 
              title: 'Verify OTP',
              headerBackTitle: 'Back'
            }}
          />
        </>
      ) : !user.hasProfile ? (
        <Stack.Screen 
          name="ProfileSetup" 
          component={ProfileSetupScreen}
          options={{ 
            title: 'Create Profile',
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
      ) : !user.hasGoals ? (
        <Stack.Screen 
          name="GoalSetting" 
          component={GoalSettingScreen}
          options={{ 
            title: 'Set Your Goals',
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
      ) : (
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}