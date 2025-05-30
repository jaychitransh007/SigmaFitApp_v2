import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface GenderStepProps {
  value: string;
  onNext: (data: { gender: string }) => void;
  onBack: () => void;
}

export default function GenderStep({ value, onNext, onBack }: GenderStepProps) {
  const theme = useAppTheme();
  const [selectedGender, setSelectedGender] = useState(value);

  const genderOptions = [
    { id: 'male', label: 'Male', icon: 'gender-male' as const },
    { id: 'female', label: 'Female', icon: 'gender-female' as const },
    { id: 'non-binary', label: 'Non-binary', icon: 'gender-non-binary' as const },
    { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: 'account-question' as const },
  ];

  const handleNext = () => {
    if (selectedGender) {
      onNext({ gender: selectedGender });
    }
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
            How do you identify?
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
            }
          ]}>
            This helps us tailor your nutrition recommendations
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                {
                  backgroundColor: selectedGender === option.id
                    ? theme.colors.primaryContainer
                    : theme.colors.surface,
                  borderColor: selectedGender === option.id
                    ? theme.colors.primary
                    : theme.custom.colors.border,
                  borderWidth: selectedGender === option.id ? 1.5 : 1,
                }
              ]}
              onPress={() => setSelectedGender(option.id)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <MaterialCommunityIcons
                  name={option.icon}
                  size={28}
                  color={selectedGender === option.id ? theme.colors.primary : theme.custom.colors.text.primary}
                  style={styles.optionIcon}
                />
                <Text style={[
                  styles.optionLabel,
                  {
                    color: selectedGender === option.id
                      ? theme.colors.primary
                      : theme.custom.colors.text.primary,
                    fontWeight: selectedGender === option.id 
                      ? theme.custom.typography.weights.bold 
                      : theme.custom.typography.weights.regular,
                    fontSize: theme.custom.typography.sizes.bodyLarge,
                  }
                ]}>
                  {option.label}
                </Text>
              </View>
              {selectedGender === option.id && (
                <View style={styles.selectedIndicator}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
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
          disabled={!selectedGender}
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
  optionCard: {
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
    width: '100%',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 16,
  },
  optionLabel: {
  },
  selectedIndicator: {
    position: 'absolute',
    right: 16,
  },
});