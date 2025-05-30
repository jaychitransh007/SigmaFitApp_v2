import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import WheelPicker from '../../../../components/WheelPicker';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 18; i >= 1900; i--) {
    years.push(i);
  }
  return years;
};

interface DateOfBirthStepProps {
  value: Date;
  onNext: (data: { dateOfBirth: Date }) => void;
  onBack: () => void;
}

export default function DateOfBirthStep({ value, onNext, onBack }: DateOfBirthStepProps) {
  const theme = useAppTheme();
  const initialDate = value || new Date(2000, 0, 1);
  const [day, setDay] = useState(initialDate.getDate());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState(new Date(year, month + 1, 0).getDate());

  useEffect(() => {
    if (value) {
      setDay(value.getDate());
      setMonth(value.getMonth());
      setYear(value.getFullYear());
    }
  }, [value]);

  useEffect(() => {
    const newDaysInMonth = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(newDaysInMonth);
    if (day > newDaysInMonth) {
      setDay(newDaysInMonth);
    }
  }, [month, year, day]);

  const handleNext = () => {
    const selectedDate = new Date(year, month, day);
    onNext({ dateOfBirth: selectedDate });
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const yearsArray = Array.from(
    { length: new Date().getFullYear() - 18 - 1900 + 1 },
    (_, i) => new Date().getFullYear() - 18 - i
  );

  const pickerTextStyle = {
    fontSize: 18,
    color: theme.colors.outline,
  };
  const pickerSelectedTextStyle = {
    fontSize: 22,
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
              fontWeight: theme.custom.typography.weights.bold
            }
          ]}>
            When were you born?
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
            }
          ]}>
            This helps us personalize your nutrition plan
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <View style={onboardingStyles.rowContainer}>
            <View style={onboardingStyles.pickerWrapper}>
              <Text style={[
                onboardingStyles.pickerLabel, 
                { 
                  color: theme.custom.colors.text.secondary, 
                  fontSize: theme.custom.typography.sizes.bodyLarge,
                  fontWeight: theme.custom.typography.weights.regular,
                }
              ]}>
                Day
              </Text>
              <WheelPicker
                items={daysArray}
                selectedIndex={day - 1}
                onSelect={(index) => setDay(daysArray[index])}
                width={80}
                itemHeight={40}
                pickerText={{
                  fontSize: 16,
                  color: theme.custom.colors.text.secondary,
                }}
                pickerSelectedText={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  fontWeight: '700',
                }}
              />
            </View>

            <View style={onboardingStyles.pickerWrapper}>
              <Text style={[
                onboardingStyles.pickerLabel, 
                { 
                  color: theme.custom.colors.text.secondary, 
                  fontSize: theme.custom.typography.sizes.bodyLarge,
                  fontWeight: theme.custom.typography.weights.regular,
                }
              ]}>
                Month
              </Text>
              <WheelPicker
                items={months}
                selectedIndex={month}
                onSelect={setMonth}
                width={120}
                itemHeight={40}
                pickerText={{
                  fontSize: 16,
                  color: theme.custom.colors.text.secondary,
                }}
                pickerSelectedText={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  fontWeight: '700',
                }}
              />
            </View>

            <View style={onboardingStyles.pickerWrapper}>
              <Text style={[
                onboardingStyles.pickerLabel, 
                { 
                  color: theme.custom.colors.text.secondary, 
                  fontSize: theme.custom.typography.sizes.bodyLarge,
                  fontWeight: theme.custom.typography.weights.regular,
                }
              ]}>
                Year
              </Text>
              <WheelPicker
                items={yearsArray}
                selectedIndex={yearsArray.indexOf(year)}
                onSelect={(index) => setYear(yearsArray[index])}
                width={100}
                itemHeight={40}
                pickerText={{
                  fontSize: 16,
                  color: theme.custom.colors.text.secondary,
                }}
                pickerSelectedText={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  fontWeight: '700',
                }}
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
