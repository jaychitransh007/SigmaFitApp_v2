import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { ProfileData } from '../index';

interface ConfirmationStepProps {
  profileData: Partial<ProfileData>;
  onComplete: () => void;
  onBack: () => void;
}

export default function ConfirmationStep({ profileData, onComplete, onBack }: ConfirmationStepProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <MaterialCommunityIcons
            name="check-circle"
            size={120}
            color={theme.colors.primary}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.headerLarge,
              fontWeight: theme.custom.typography.weights.bold
            }
          ]}>
            You're all set!
          </Text>
          
          <Text style={[
            styles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
              textAlign: 'center'
            }
          ]}>
            Thank you for trusting us with your data, {profileData.name || 'there'}
          </Text>

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

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={onBack}
          style={styles.backButton}
          contentStyle={styles.buttonContent}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={onComplete}
          style={styles.getStartedButton}
          contentStyle={styles.buttonContent}
          icon="arrow-right"
        >
          Get Started
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    paddingHorizontal: 24,
  },
  benefitsContainer: {
    marginTop: 32,
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
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 24,
  },
  backButton: {
    flex: 0.4,
    borderRadius: 12,
  },
  getStartedButton: {
    flex: 1,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});