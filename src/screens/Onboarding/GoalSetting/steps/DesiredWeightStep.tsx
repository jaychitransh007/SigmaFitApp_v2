import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import NumberScroller from '../../ProfileSetup/components/NumberScroller';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface DesiredWeightStepProps {
  value: number;
  onNext: (data: { desiredWeight: number }) => void;
  onBack: () => void;
}

export default function DesiredWeightStep({ value, onNext, onBack }: DesiredWeightStepProps) {
  const theme = useAppTheme();
  const [selectedWeight, setSelectedWeight] = useState(value || 70);

  const handleNext = () => {
    onNext({ desiredWeight: selectedWeight });
  };

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
            Your target weight
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge
            }
          ]}>
            What weight would you like to achieve?
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <NumberScroller
            value={selectedWeight}
            onChange={setSelectedWeight}
            min={30}
            max={200}
            unit="kg"
          />
        </View>

        <View style={[
          styles.infoCard, 
          { 
            backgroundColor: theme.colors.surfaceVariant, 
            marginTop: 24,
          }
        ]}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={theme.custom.colors.accent.blue}
          />
          <Text style={[
            styles.infoText, 
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyMedium,
            }
          ]}>
            A healthy weight depends on your height, age, and body composition.
          </Text>
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
          onPress={handleNext}
          style={[onboardingStyles.button, onboardingStyles.nextButton]}
          contentStyle={onboardingStyles.buttonContent}
          icon="arrow-right"
        >
          Continue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
    width: '100%',
  },
  infoText: {
    flex: 1,
    lineHeight: 20,
  },
});