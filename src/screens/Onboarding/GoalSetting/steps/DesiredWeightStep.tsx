import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import WheelPicker from '../../../../components/WheelPicker';
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
          <View style={onboardingStyles.inputWrapper}>
            <View style={onboardingStyles.pickerWrapper}>
              <WheelPicker
                items={Array.from({length: 171}, (_, i) => i + 30)} // 30 to 200 kg
                selectedIndex={selectedWeight - 30}
                onSelect={(index: number) => setSelectedWeight(index + 30)}
                width={200}
                itemHeight={50}
                pickerText={{
                  fontSize: 16,
                  color: theme.custom.colors.text.secondary,
                }}
                pickerSelectedText={{
                  fontSize: 24,
                  color: theme.colors.primary,
                  fontWeight: '700',
                }}
              />
              <Text style={[
                styles.unitLabel,
                {
                  color: theme.colors.primary,
                  fontSize: theme.custom.typography.sizes.bodyLarge,
                  fontWeight: theme.custom.typography.weights.bold,
                }
              ]}>
                kg
              </Text>
            </View>
          </View>
        </View>


        <View style={styles.infoCardContainer}>
          <View style={[
            styles.infoCard, 
            { 
              backgroundColor: theme.colors.surfaceVariant,
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
  infoCardContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
    width: '100%',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
  },
  unitLabel: {
    position: 'absolute',
    right: 40,
    top: '50%',
    marginTop: -10,
  },
});