import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services/api';

interface User {
  id: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  hasProfile: boolean;
  hasGoals: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  requestOTP: (phoneNumber: string) => Promise<{ userId: string; otp?: string }>;
  verifyOTP: (userId: string, otp: string) => Promise<{
    id: string;
    phoneNumber: string;
    name: string;
    email: string;
    hasProfile: boolean;
    hasGoals: boolean;
  }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profile: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestOTP = async (phoneNumber: string) => {
    try {
      console.log('[AuthContext] Requesting OTP for:', phoneNumber);
      const { data: responseData, error: otpError } = await authAPI.requestOTP(phoneNumber);
      
      console.log('[AuthContext] OTP API response:', { responseData, otpError });
      
      if (otpError || !responseData) {
        console.error('[AuthContext] OTP request failed:', otpError);
        throw new Error(otpError || 'Failed to request OTP');
      }
      
      // The server returns the user ID in the data object
      const userId = responseData.data?.userId;
      if (!userId) {
        console.error('[AuthContext] No user ID in response:', responseData);
        throw new Error('Failed to get user ID from server');
      }
      
      console.log('[AuthContext] OTP request successful, userId:', userId);
      
      // Create a temp user with a special prefix to indicate it's not fully authenticated
      const tempUser = { 
        id: `temp-${userId}`, // Add temp- prefix to indicate this is a temporary user
        phoneNumber, 
        hasProfile: false, 
        hasGoals: false 
      };
      
      console.log('[AuthContext] Storing tempUser in AsyncStorage:', tempUser);
      await AsyncStorage.setItem('tempUser', JSON.stringify(tempUser));
      
      // Update the user state with the temp user
      setUser(tempUser);
      
      // Verify the tempUser was stored correctly
      const storedUser = await AsyncStorage.getItem('tempUser');
      console.log('[AuthContext] Stored tempUser from AsyncStorage:', storedUser);
      
      // Log the current navigation state for debugging
      console.log('[AuthContext] Current navigation state should allow OTP verification');
      
      // In development, we might get the OTP in the response
      const otp = responseData.data?.otp;
      if (otp) {
        console.log('[AuthContext] OTP for development:', otp);
      }
      
      return { userId, otp };
    } catch (error) {
      console.error('Request OTP error:', error);
      throw error;
    }
  };

  const verifyOTP = async (userId: string, otp: string) => {
    console.log('Verifying OTP for user:', userId);
    try {
      // Verify OTP with the backend
      const { data, error } = await authAPI.verifyOTP(userId, otp);
      
      if (error || !data) {
        console.error('OTP verification failed:', error);
        throw new Error(error || 'Verification failed');
      }
      
      console.log('OTP verified successfully, response data:', data);
      
      // The server returns the user data in data.user
      const userData = data.data?.user;
      const token = data.data?.token;
      
      if (!userData || !token) {
        console.error('Invalid response format from server:', data);
        throw new Error('Invalid response from server');
      }
      
      // Format user data for the app
      const formattedUser = {
        id: userData.id,
        phoneNumber: userData.mobile || '',
        name: userData.name || `User-${userData.mobile?.slice(-4) || ''}`,
        email: userData.email || '',
        hasProfile: userData.hasProfile || false,
        hasGoals: userData.hasGoals || false,
      };
      
      console.log('Formatted user data:', formattedUser);
      
      // Store user data and token
      await AsyncStorage.setItem('user', JSON.stringify(formattedUser));
      await AsyncStorage.setItem('token', token);
      
      // Update the user state - this will trigger navigation in AppNavigator
      setUser(formattedUser);
      
      // Clear temp user data
      await AsyncStorage.removeItem('tempUser');
      
      console.log('User successfully authenticated, updated user state:', formattedUser);
      
      // Return the formatted user data for any additional handling
      return formattedUser;
      
    } catch (error) {
      console.error('Verify OTP error:', error);
      // Clear any partial auth state on error
      await AsyncStorage.removeItem('tempUser');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // TODO: Implement Google Sign In
      console.log('Google sign in not implemented yet');
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Call the logout API
      await authAPI.logout();
      
      // Clear all auth-related data
      await AsyncStorage.multiRemove(['user', 'token', 'tempUser']);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if API call fails, clear local storage
      await AsyncStorage.multiRemove(['user', 'token', 'tempUser']);
      setUser(null);
    }
  };

  const updateUserProfile = async (profile: Partial<User>) => {
    try {
      if (!user) return;
      
      const updatedUser = { ...user, ...profile };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      requestOTP,
      verifyOTP,
      signInWithGoogle,
      signOut,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};