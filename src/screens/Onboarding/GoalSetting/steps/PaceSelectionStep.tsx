import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import Slider from '@react-native-community/slider';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface PaceSelectionStepProps {
  value: number;
  goal: string;
  onNext: (data: { paceOfAchievingGoal: number }) => void;
  onBack: () => void;
}

export default function PaceSelectionStep({ value, goal, onNext, onBack }: PaceSelectionStepProps) {
  const theme = useAppTheme();
  const [selectedPace, setSelectedPace] = useState(value || 0.5);

  const handleNext = () => {
    onNext({ paceOfAchievingGoal: selectedPace });
  };

  const getRecommendationStatus = () => {
    if (selectedPace >= 0.4 && selectedPace <= 0.8) {
      return 'recommended';
    } else if (selectedPace > 0.8 || (goal === 'gain' && selectedPace > 1.0)) {
      return 'warning';
    }
    return 'normal';
  };

  const getWeeklyChange = () => {
    return `${selectedPace.toFixed(1)} kg per week`;
  };

  const status = getRecommendationStatus();
  const goalVerb = goal === 'gain' ? 'gain' : 'lose';

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
            Your pace
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge
            }
          ]}>
            How fast do you want to {goalVerb} weight?
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <ScrollView 
            contentContainerStyle={onboardingStyles.inputWrapper}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[
              styles.paceLabel,
              {
                color: theme.custom.colors.text.primary,
                fontSize: theme.custom.typography.sizes.headerLarge,
                fontWeight: theme.custom.typography.weights.bold,
              }
            ]}>
              {getWeeklyChange()}
            </Text>
            
            <Slider
              style={styles.slider}
              minimumValue={0.1}
              maximumValue={goal === 'gain' ? 1.5 : 2}
              step={0.1}
              value={selectedPace}
              onValueChange={setSelectedPace}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.custom.colors.border}
              thumbTintColor={theme.colors.primary}
            />
            
            <View style={styles.sliderLabelsContainer}>
              <Text style={[
                styles.sliderLabelText,
                { 
                  color: theme.custom.colors.text.secondary,
                  fontSize: theme.custom.typography.sizes.bodySmall,
                }
              ]}>
                0.1 kg
              </Text>
              <Text style={[
                styles.sliderLabelText,
                { 
                  color: theme.custom.colors.text.secondary,
                  fontSize: theme.custom.typography.sizes.bodySmall,
                }
              ]}>
                {goal === 'gain' ? '1.5' : '2.0'} kg
              </Text>
            </View>

            {status === 'recommended' && (
              <Card style={[
                styles.infoCard, 
                { 
                  backgroundColor: theme.custom.colors.accent.green + '20',
                  borderColor: theme.custom.colors.accent.green
                }
              ]}>
                <Card.Content style={styles.infoCardContent}>
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    size={24}
                    color={theme.custom.colors.accent.green}
                  />
                  <Text style={[
                    styles.infoCardText,
                    { 
                      color: theme.custom.colors.text.primary,
                      fontSize: theme.custom.typography.sizes.bodyMedium,
                    }
                  ]}>
                    Recommended pace for sustainable results.
                  </Text>
                </Card.Content>
              </Card>
            )}

            {status === 'warning' && (
              <Card style={[
                styles.infoCard, 
                { 
                  backgroundColor: theme.custom.colors.accent.red + '20',
                  borderColor: theme.custom.colors.accent.red
                }
              ]}>
                <Card.Content style={styles.infoCardContent}>
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={24}
                    color={theme.custom.colors.accent.red}
                  />
                  <Text style={[
                    styles.infoCardText,
                    { 
                      color: theme.custom.colors.text.primary,
                      fontSize: theme.custom.typography.sizes.bodyMedium,
                    }
                  ]}>
                    {goal === 'gain' 
                      ? 'Gaining too quickly can lead to excess fat.' 
                      : 'You may lose muscle mass at this pace.'}
                  </Text>
                </Card.Content>
              </Card>
            )}
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
  paceLabel: {
    textAlign: 'center',
    marginBottom: 24,
  },
  slider: {
    height: 40,
    width: '100%',
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
  sliderLabelText: {
  },
  infoCard: {
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoCardText: {
    flex: 1,
    lineHeight: 20,
  },
});