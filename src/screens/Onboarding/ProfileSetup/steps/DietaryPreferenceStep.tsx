import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface DietaryPreferenceStepProps {
  value: string;
  onNext: (data: { dietaryPreferences: string }) => void;
  onBack: () => void;
}

export default function DietaryPreferenceStep({ value, onNext, onBack }: DietaryPreferenceStepProps) {
  const theme = useAppTheme();
  const [selectedPreference, setSelectedPreference] = useState(value);

  const preferences = [
    { id: 'vegan', label: 'Vegan', icon: 'leaf' as const, description: 'Plant-based only' },
    { id: 'vegetarian', label: 'Vegetarian', icon: 'carrot' as const, description: 'No meat or fish' },
    { id: 'eggetarian', label: 'Eggetarian', icon: 'egg' as const, description: 'Vegetarian + eggs' },
    { id: 'non-vegetarian', label: 'Non-vegetarian', icon: 'food-drumstick' as const, description: 'All foods' },
  ];

  const handleNext = () => {
    if (selectedPreference) {
      onNext({ dietaryPreferences: selectedPreference });
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
            Dietary preference
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
            }
          ]}>
            We'll suggest meals that match your lifestyle
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          {preferences.map((pref) => (
            <TouchableOpacity
              key={pref.id}
              style={[
                styles.optionCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: selectedPreference === pref.id ? theme.colors.primary : theme.custom.colors.border,
                  borderWidth: selectedPreference === pref.id ? 2 : 1,
                }
              ]}
              onPress={() => setSelectedPreference(pref.id)}
            >
              <MaterialCommunityIcons
                name={pref.icon}
                size={32}
                color={selectedPreference === pref.id ? theme.colors.primary : theme.custom.colors.text.secondary}
                style={styles.optionIcon}
              />
              <View style={styles.optionTextContainer}>
                <Text style={[
                  styles.optionLabel,
                  {
                    color: selectedPreference === pref.id ? theme.colors.primary : theme.custom.colors.text.primary,
                    fontWeight: selectedPreference === pref.id ? theme.custom.typography.weights.bold : theme.custom.typography.weights.regular,
                    fontSize: theme.custom.typography.sizes.bodyLarge,
                  }
                ]}>
                  {pref.label}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  {
                    color: theme.custom.colors.text.secondary,
                    fontSize: theme.custom.typography.sizes.bodySmall,
                  }
                ]}>
                  {pref.description}
                </Text>
              </View>
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
          disabled={!selectedPreference}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  optionIcon: {
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
    gap: 4,
  },
  optionLabel: {
  },
  optionDescription: {
  },
});