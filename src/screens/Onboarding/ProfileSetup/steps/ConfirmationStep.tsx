import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { ProfileData } from '../index';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface ConfirmationStepProps {
  profileData: Partial<ProfileData>;
  onComplete: () => void;
  onBack: () => void;
}

export default function ConfirmationStep({ profileData, onComplete, onBack }: ConfirmationStepProps) {
  const theme = useAppTheme();

  return (
    <View style={onboardingStyles.container}>
      <View style={onboardingStyles.content}>
        <View style={onboardingStyles.header}>
          <Text style={[
            onboardingStyles.title,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.headerLarge,
              fontWeight: theme.custom.typography.weights.bold
            }
          ]}>
            You're all set!
          </Text>
          
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
            }
          ]}>
            Thank you for trusting us with your data, {profileData.name || 'there'}
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <View style={styles.illustrationContent}>
            <MaterialCommunityIcons
              name="check-circle"
              size={120}
              color={theme.colors.primary}
            />

            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <MaterialCommunityIcons
                  name="chart-line"
                  size={24}
                  color={theme.custom.colors.accent.green}
                />
                <Text style={[styles.benefitText, { color: theme.custom.colors.text.primary }]}>
                  Track your nutrition progress
                </Text>
              </View>
              
              <View style={styles.benefitItem}>
                <MaterialCommunityIcons
                  name="food-apple"
                  size={24}
                  color={theme.custom.colors.accent.orange}
                />
                <Text style={[styles.benefitText, { color: theme.custom.colors.text.primary }]}>
                  Get personalized meal suggestions
                </Text>
              </View>
              
              <View style={styles.benefitItem}>
                <MaterialCommunityIcons
                  name="target"
                  size={24}
                  color={theme.custom.colors.accent.blue}
                />
                <Text style={[styles.benefitText, { color: theme.custom.colors.text.primary }]}>
                  Achieve your health goals
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={onboardingStyles.footer}>
        <Button
          mode="outlined"
          onPress={onBack}
          style={[onboardingStyles.button, onboardingStyles.backButton]}
          contentStyle={onboardingStyles.buttonContent}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={onComplete}
          style={[onboardingStyles.button, onboardingStyles.nextButton]}
          contentStyle={onboardingStyles.buttonContent}
          icon="arrow-right"
        >
          Get Started
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationContent: {
    alignItems: 'center',
    gap: 32,
  },
  benefitsContainer: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 16,
  },
});