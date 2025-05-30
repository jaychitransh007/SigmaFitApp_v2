import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput as RNTextInput, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface UserData {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
  hasProfile: boolean;
  hasGoals: boolean;
}
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../context/AuthContext';

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTPVerification'>;
type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

export default function OTPVerificationScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const { phoneNumber, userId: routeUserId } = route.params;
  const { verifyOTP } = useAuth();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(RNTextInput | null)[]>([]);
  const [userId, setUserId] = useState(routeUserId || '');
  
  // Set userId from route params or AsyncStorage on component mount
  useEffect(() => {
    console.log('OTPVerificationScreen mounted with params:', { routeUserId, phoneNumber });
    
    if (!userId && routeUserId) {
      console.log('Setting userId from route params:', routeUserId);
      setUserId(routeUserId);
    } else if (!userId) {
      console.warn('No userId provided in route params, falling back to AsyncStorage');
      const getUserIdFromStorage = async () => {
        try {
          const tempUser = await AsyncStorage.getItem('tempUser');
          console.log('Retrieved tempUser from AsyncStorage:', tempUser);
          
          if (tempUser) {
            const { id } = JSON.parse(tempUser);
            console.log('Retrieved userId from AsyncStorage:', id);
            if (id) {
              setUserId(id);
            } else {
              console.error('No id found in tempUser');
            }
          } else {
            console.error('No tempUser found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error getting temp user from AsyncStorage:', error);
        }
      };
      getUserIdFromStorage();
    } else {
      console.log('Using existing userId from state:', userId);
    }
  }, [userId, routeUserId]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    // Validate OTP format
    if (otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    if (!userId) {
      setError('Session expired. Please request a new OTP.');
      return;
    }
    
    console.log('Verifying OTP:', otpString, 'for user:', userId);
    setIsLoading(true);
    setError('');
    
    try {
      const user = await verifyOTP(userId, otpString);
      console.log('OTP verification successful, user:', user);
      
      // Check if user needs to complete profile
      if (!user.hasProfile) {
        console.log('Navigating to profile setup');
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProfileSetup' as const }],
        });
      } else if (!user.hasGoals) {
        console.log('Navigating to goal setting');
        navigation.reset({
          index: 0,
          routes: [{ name: 'GoalSetting' as const }],
        });
      } else {
        console.log('Navigating to main app');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' as const }],
        });
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError(error instanceof Error ? error.message : 'Invalid OTP. Please try again.');
      
      // Clear OTP fields on error but keep focus
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[
          styles.title,
          { 
            color: theme.custom.colors.text.primary,
            fontSize: theme.custom.typography.sizes.headerMedium,
            fontWeight: theme.custom.typography.weights.semiBold
          }
        ]}>
          Enter verification code
        </Text>
        
        <Text style={[
          styles.subtitle,
          { 
            color: theme.custom.colors.text.secondary,
            fontSize: theme.custom.typography.sizes.bodyMedium
          }
        ]}>
          We've sent a 6-digit code to {phoneNumber}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={ref => { inputRefs.current[index] = ref; }}
              style={[
                styles.otpInput,
                { 
                  borderColor: error ? theme.colors.error : 
                    (digit ? theme.colors.primary : theme.custom.colors.border),
                  backgroundColor: theme.colors.surface,
                  color: theme.custom.colors.text.primary,
                }
              ]}
              value={digit}
              onChangeText={(value) => {
                setError('');
                handleOtpChange(value, index);
              }}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              editable={!isLoading}
            />
          ))}
        </View>
        
        {error ? (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <Button 
          mode="contained" 
          onPress={handleVerifyOTP}
          style={[styles.button, { marginTop: 30 }]}
          disabled={!isOtpComplete || isLoading}
          loading={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>

        <Button
          mode="text"
          onPress={() => console.log('Resend OTP')}
          style={styles.resendButton}
        >
          Resend Code
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  countdown: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  verifyButton: {
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  resendButton: {
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
  errorText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: 'red',
  },
});