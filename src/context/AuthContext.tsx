import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  signIn: (phoneNumber: string, otp: string) => Promise<void>;
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

  const signIn = async (phoneNumber: string, otp: string) => {
    try {
      // TODO: Replace with actual API call
      // Simulating API response
      const response = {
        user: {
          id: '123',
          phoneNumber,
          hasProfile: false,
          hasGoals: false,
        },
        token: 'fake-jwt-token',
      };

      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      await AsyncStorage.setItem('token', response.token);
      setUser(response.user);
    } catch (error) {
      console.error('Sign in error:', error);
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
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
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
      signIn,
      signInWithGoogle,
      signOut,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};