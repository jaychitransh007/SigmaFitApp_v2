import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../context/AuthContext'; // ADD THIS IMPORT

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTPVerification'>;
type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

export default function OTPVerificationScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const { phoneNumber } = route.params;
  const { signIn } = useAuth(); // ADD THIS LINE
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(RNTextInput | null)[]>([]);

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
    if (otpString.length === 6) {
      try {
        await signIn(phoneNumber, otpString);
        // Navigation will be handled automatically by AppNavigator
      } catch (error) {
        // Handle error
        console.error('OTP verification failed:', error);
      }
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
                  borderColor: digit ? theme.colors.primary : theme.custom.colors.border,
                  backgroundColor: theme.colors.surface,
                  color: theme.custom.colors.text.primary,
                }
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleVerifyOTP}
          disabled={!isOtpComplete}
          style={styles.verifyButton}
          contentStyle={styles.buttonContent}
        >
          Verify OTP
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
});