import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuth } from '../context/AuthContext';

// Import screens
import LoginScreen from '../screens/Auth/LoginScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import ProfileSetupScreen from '../screens/Onboarding/ProfileSetup';
import GoalSettingScreen from '../screens/Onboarding/GoalSetting';
import MainNavigator from './MainNavigator';

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  OTPVerification: { 
    phoneNumber: string;
    userId: string;
  };
  ProfileSetup: undefined;
  GoalSetting: undefined;
  Main: undefined;
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
    // Check if we're in the middle of OTP verification
    const isVerifyingOTP = user?.id?.includes('temp-') || false;
    
    if (!user || isVerifyingOTP) return 'Login';
    if (!user.hasProfile) return 'ProfileSetup';
    if (!user.hasGoals) return 'GoalSetting';
    return 'Main';
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
      {/* Always include auth screens */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen 
        name="OTPVerification" 
        component={OTPVerificationScreen}
        options={{ 
          title: 'Verify OTP',
          headerBackTitle: 'Back',
          gestureEnabled: true
        }}
      />
      
      {/* Protected screens - only show when user is authenticated */}
      {user && !user.id?.includes('temp-') && (
        <>
          {/* Show profile setup if user hasn't completed it */}
          {!user.hasProfile && (
            <Stack.Screen 
              name="ProfileSetup" 
              component={ProfileSetupScreen}
              options={{ 
                title: 'Create Profile',
                headerLeft: () => null,
                gestureEnabled: false,
              }}
            />
          )}
          
          {/* Show goal setting if profile is complete but goals aren't set */}
          {user.hasProfile && !user.hasGoals && (
            <Stack.Screen 
              name="GoalSetting" 
              component={GoalSettingScreen}
              options={{ 
                title: 'Set Your Goals',
                headerLeft: () => null,
                gestureEnabled: false,
              }}
            />
          )}
          
          {/* Show main app if all setup is complete */}
          {user.hasProfile && user.hasGoals && (
            <Stack.Screen 
              name="Main" 
              component={MainNavigator}
              options={{ 
                headerShown: false,
                gestureEnabled: false
              }}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}