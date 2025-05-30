import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface HoldingBackStepProps {
  values: string[];
  onComplete: () => void;
  onBack: () => void;
}

export default function HoldingBackStep({ values, onComplete, onBack }: HoldingBackStepProps) {
  const theme = useAppTheme();
  const [selectedFactors, setSelectedFactors] = useState<string[]>(values);

  const factors = [
    { id: 'consistency', label: 'Lack of consistency', icon: 'calendar-remove' as const },
    { id: 'unhealthy', label: 'Unhealthy eating habits', icon: 'food-off' as const },
    { id: 'support', label: 'Lack of support', icon: 'account-group-outline' as const },
    { id: 'busy', label: 'Busy schedule', icon: 'clock-outline' as const },
    { id: 'inspiration', label: 'Lack of meal inspiration', icon: 'lightbulb-outline' as const },
  ];

  const toggleFactor = (factorId: string) => {
    setSelectedFactors(prev => {
      if (prev.includes(factorId)) {
        return prev.filter(id => id !== factorId);
      } else {
        return [...prev, factorId];
      }
    });
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
            What's holding you back?
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
            }
          ]}>
            Select all that apply (optional)
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <ScrollView 
            contentContainerStyle={onboardingStyles.inputWrapper}
            showsVerticalScrollIndicator={false}
          >
            {factors.map((factor) => (
              <TouchableOpacity
                key={factor.id}
                style={[
                  styles.factorCard,
                  {
                    backgroundColor: selectedFactors.includes(factor.id)
                      ? theme.colors.primaryContainer
                      : theme.colors.surface,
                    borderColor: selectedFactors.includes(factor.id)
                      ? theme.colors.primary
                      : theme.custom.colors.border,
                  }
                ]}
                onPress={() => toggleFactor(factor.id)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={factor.icon}
                  size={24}
                  color={selectedFactors.includes(factor.id)
                    ? theme.colors.primary
                    : theme.custom.colors.text.secondary}
                  style={styles.factorIcon}
                />
                <Text style={[
                  styles.factorLabel,
                  {
                    color: selectedFactors.includes(factor.id)
                      ? theme.colors.primary
                      : theme.custom.colors.text.primary,
                    fontWeight: selectedFactors.includes(factor.id)
                      ? theme.custom.typography.weights.bold 
                      : theme.custom.typography.weights.regular,
                    fontSize: theme.custom.typography.sizes.bodyLarge,
                  }
                ]}>
                  {factor.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  factorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    width: '100%',
  },
  factorIcon: {
    marginRight: 16,
  },
  factorLabel: {
    flex: 1,
  },
});