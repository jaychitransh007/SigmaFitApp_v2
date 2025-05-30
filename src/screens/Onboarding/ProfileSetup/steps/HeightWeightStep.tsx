import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import WheelPicker from '../../../../components/WheelPicker';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

// Define the WheelPicker props interface to include the missing props
interface WheelPickerProps {
  items: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  width: number;
  itemHeight?: number;
  visibleItemCount?: number;
  textStyle?: any;
  selectedTextStyle?: any;
  formatItem?: (item: string | number) => string;
}

interface HeightWeightStepProps {
  height: number;
  weight: number;
  onNext: (data: { height: number; weight: number }) => void;
  onBack: () => void;
}

export default function HeightWeightStep({ height, weight, onNext, onBack }: HeightWeightStepProps) {
  const theme = useAppTheme();
  const [selectedHeight, setSelectedHeight] = useState(height || 170);
  const [selectedWeight, setSelectedWeight] = useState(weight || 70);

  const handleNext = () => {
    onNext({ height: selectedHeight, weight: selectedWeight });
  };

  // Generate arrays for height and weight
  const heights = Array.from({ length: 151 }, (_, i) => 100 + i); // 100cm to 250cm
  const weights = Array.from({ length: 171 }, (_, i) => 30 + i); // 30kg to 200kg

  // Local styles for picker text, as these are specific to WheelPicker component appearance
  const pickerTextStyle = {
    fontSize: 18,
    color: theme.colors.outline,
    textAlign: 'center',
  };
  const pickerSelectedTextStyle = {
    fontSize: 24,
    color: theme.custom.colors.text.primary,
    fontWeight: theme.custom.typography.weights.bold,
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
              fontWeight: theme.custom.typography.weights.bold,
            }
          ]}>
            Your measurements
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            {
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
            }
          ]}>
            We'll use these to calculate your nutrition needs
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <View style={onboardingStyles.rowContainer}>
            {/* Height Picker */}
            <View style={onboardingStyles.pickerWrapper}>
              <Text style={[
                onboardingStyles.pickerLabel,
                {
                  color: theme.custom.colors.text.secondary,
                  fontSize: theme.custom.typography.sizes.bodyLarge,
                  fontWeight: theme.custom.typography.weights.regular,
                }
              ]}>Height</Text>
              <WheelPicker
                items={heights}
                selectedIndex={Math.max(0, heights.indexOf(selectedHeight))}
                onSelect={(index) => setSelectedHeight(heights[index])}
                formatItem={(item) => `${item} cm`}
                width={120}
                itemHeight={50}
                visibleItemCount={3}
                pickerText={pickerTextStyle}
                pickerSelectedText={pickerSelectedTextStyle}
              />
            </View>

            {/* Weight Picker */}
            <View style={onboardingStyles.pickerWrapper}>
              <Text style={[
                onboardingStyles.pickerLabel,
                {
                  color: theme.custom.colors.text.secondary,
                  fontSize: theme.custom.typography.sizes.bodyLarge,
                  fontWeight: theme.custom.typography.weights.regular,
                }
              ]}>Weight</Text>
              <WheelPicker
                items={weights}
                selectedIndex={Math.max(0, weights.indexOf(selectedWeight))}
                onSelect={(index) => setSelectedWeight(weights[index])}
                formatItem={(item) => `${item} kg`}
                width={120}
                itemHeight={50}
                visibleItemCount={3}
                pickerText={pickerTextStyle}
                pickerSelectedText={pickerSelectedTextStyle}
              />
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