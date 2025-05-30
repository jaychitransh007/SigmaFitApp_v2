import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface GoalSelectionStepProps {
  value: string;
  onNext: (data: { desiredGoal: string }) => void;
}

export default function GoalSelectionStep({ value, onNext }: GoalSelectionStepProps) {
  const theme = useAppTheme();
  const [selectedGoal, setSelectedGoal] = useState(value);

  const goals = [
    { 
      id: 'lose', 
      label: 'Lose weight', 
      icon: 'trending-down' as const,
      color: theme.custom.colors.accent.red,
      description: 'Shed those extra pounds'
    },
    { 
      id: 'maintain', 
      label: 'Maintain', 
      icon: 'equal' as const,
      color: theme.custom.colors.accent.blue,
      description: 'Keep your current weight'
    },
    { 
      id: 'gain', 
      label: 'Gain weight', 
      icon: 'trending-up' as const,
      color: theme.custom.colors.accent.green,
      description: 'Build muscle mass'
    },
  ];

  const handleNext = () => {
    if (selectedGoal) {
      onNext({ desiredGoal: selectedGoal });
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
            What's your goal?
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge
            }
          ]}>
            We'll help you get there, one meal at a time
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <View style={onboardingStyles.inputWrapper}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: selectedGoal === goal.id ? goal.color : theme.custom.colors.border,
                    borderWidth: selectedGoal === goal.id ? 2 : 1,
                  }
                ]}
                onPress={() => setSelectedGoal(goal.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, { backgroundColor: goal.color + '20' }]}>
                  <MaterialCommunityIcons
                    name={goal.icon}
                    size={32}
                    color={goal.color}
                  />
                </View>
                <View style={styles.goalTextContainer}>
                  <Text style={[
                    styles.goalLabel,
                    {
                      color: selectedGoal === goal.id ? goal.color : theme.custom.colors.text.primary,
                      fontWeight: selectedGoal === goal.id 
                        ? theme.custom.typography.weights.bold 
                        : theme.custom.typography.weights.regular,
                      fontSize: theme.custom.typography.sizes.bodyLarge,
                    }
                  ]}>
                    {goal.label}
                  </Text>
                  <Text style={[
                    styles.goalDescription,
                    { 
                      color: theme.custom.colors.text.secondary,
                      fontSize: theme.custom.typography.sizes.bodySmall,
                    }
                  ]}>
                    {goal.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={onboardingStyles.footer}>
        <Button
          mode="contained"
          onPress={handleNext}
          disabled={!selectedGoal}
          style={[onboardingStyles.button, onboardingStyles.nextButton, { flex: 1 }]}
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
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalTextContainer: {
    flex: 1,
    gap: 4,
  },
  goalLabel: {
  },
  goalDescription: {
  },
});