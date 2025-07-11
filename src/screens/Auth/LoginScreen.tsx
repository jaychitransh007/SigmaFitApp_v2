import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Divider, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../context/AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { requestOTP } = useAuth();

  const validatePhoneNumber = () => {
    // Basic phone validation
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedNumber.length !== 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneLogin = async () => {
    if (!validatePhoneNumber()) return;
    
    try {
      console.log('Initiating OTP request for:', phoneNumber);
      setIsLoading(true);
      
      // Format phone number to ensure it's in the correct format
      const formattedNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `+91${phoneNumber.replace(/\D/g, '').slice(-10)}`;
      
      console.log('Formatted phone number for OTP request:', formattedNumber);
      
      // Request OTP and wait for response
      const { userId, otp } = await requestOTP(formattedNumber);
      
      if (!userId) {
        throw new Error('No user ID received from server');
      }
      
      console.log('OTP request successful, navigating to OTP screen with:', { 
        phoneNumber: formattedNumber,
        userId 
      });
      
      // Navigate to OTP screen with both phone number and userId
      navigation.navigate('OTPVerification', { 
        phoneNumber: formattedNumber,
        userId
      });
      
      // In development, log the OTP for testing
      if (otp) {
        console.log('[DEV] OTP for testing:', otp);
      }
      
    } catch (error) {
      console.error('Error in handlePhoneLogin:', error);
      
      // Show error to user
      Alert.alert(
        'Error', 
        error instanceof Error ? error.message : 'Failed to send OTP. Please try again.',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google Sign In
    console.log('Google login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo/App Name */}
          <View style={styles.header}>
            <MaterialCommunityIcons 
              name="nutrition" 
              size={64} 
              color={theme.colors.primary} 
            />
            <Text style={[
              styles.appName,
              { 
                color: theme.custom.colors.text.primary,
                fontSize: theme.custom.typography.sizes.headerLarge,
                fontWeight: theme.custom.typography.weights.bold
              }
            ]}>
              Sigma Fit
            </Text>
            <Text style={[
              styles.tagline,
              { 
                color: theme.custom.colors.text.secondary,
                fontSize: theme.custom.typography.sizes.bodyMedium
              }
            ]}>
              Track your nutrition, reach your goals
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <Text style={[
              styles.formTitle,
              { 
                color: theme.custom.colors.text.primary,
                fontSize: theme.custom.typography.sizes.bodyLarge,
                fontWeight: theme.custom.typography.weights.semiBold
              }
            ]}>
              Welcome back
            </Text>

            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setPhoneError('');
              }}
              mode="outlined"
              keyboardType="phone-pad"
              placeholder="Enter 10-digit number"
              error={!!phoneError}
              style={styles.input}
              left={<TextInput.Icon icon="phone" />}
            />
            {phoneError ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {phoneError}
              </Text>
            ) : null}

            <Button
              mode="contained"
              onPress={handlePhoneLogin}
              style={[styles.button, { marginBottom: 16 }]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              icon={isLoading ? () => <ActivityIndicator color="white" /> : "phone"}
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Continue with Phone'}
            </Button>

            <View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text style={[styles.orText, { color: theme.custom.colors.text.secondary }]}>
                OR
              </Text>
              <Divider style={styles.divider} />
            </View>

            <Button
              mode="outlined"
              onPress={handleGoogleLogin}
              style={styles.googleButton}
              contentStyle={styles.buttonContent}
              icon={() => (
                <MaterialCommunityIcons name="google" size={20} color={theme.colors.primary} />
              )}
            >
              Continue with Google
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  buttonContent: {
    height: 48,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  appName: {
    marginTop: 16,
  },
  tagline: {
    marginTop: 8,
  },
  form: {
    flex: 1,
  },
  formTitle: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    marginBottom: 24,
  },
});