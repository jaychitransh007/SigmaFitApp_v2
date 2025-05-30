import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../hooks/useAppTheme';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const theme = useAppTheme();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { backgroundColor: theme.custom.colors.progressTrack }]}>
        <View 
          style={[
            styles.progressFill, 
            { 
              backgroundColor: theme.colors.primary,
              width: `${progress}%` 
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});