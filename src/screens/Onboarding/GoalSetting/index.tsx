import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';

// Import step components
import GoalSelectionStep from './steps/GoalSelectionStep';
import DesiredWeightStep from './steps/DesiredWeightStep';
import PaceSelectionStep from './steps/PaceSelectionStep';
import HoldingBackStep from './steps/HoldingBackStep';
import ProgressBar from '../ProfileSetup/components/ProgressBar';

type GoalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GoalSetting'>;

export interface GoalData {
  desiredGoal: string;
  desiredWeight?: number;
  paceOfAchievingGoal?: number;
  holdingBackFactors: string[];
}

export default function GoalSettingScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation<GoalScreenNavigationProp>();
  const { updateUserProfile } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [goalData, setGoalData] = useState<GoalData>({
    desiredGoal: '',
    desiredWeight: 70,
    paceOfAchievingGoal: 0.5,
    holdingBackFactors: [],
  });

  // Dynamic total steps based on goal selection
  const totalSteps = goalData.desiredGoal === 'maintain' ? 2 : 4;

  const handleNext = (data: Partial<GoalData>) => {
    setGoalData(prev => ({ ...prev, ...data }));
    
    // Skip weight and pace steps for maintenance goal
    if (currentStep === 0 && data.desiredGoal === 'maintain') {
      setCurrentStep(3); // Go directly to holding back factors
    } else if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 3 && goalData.desiredGoal === 'maintain') {
      setCurrentStep(0); // Go back to goal selection
    } else if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await updateUserProfile({
        hasGoals: true,
      });
      // Save goal data to your backend here
      navigation.navigate('Home');
    } catch (error) {
      console.error('Goal setting failed:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GoalSelectionStep value={goalData.desiredGoal} onNext={handleNext} />;
      case 1:
        return <DesiredWeightStep value={goalData.desiredWeight || 70} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <PaceSelectionStep value={goalData.paceOfAchievingGoal || 0.5} goal={goalData.desiredGoal} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <HoldingBackStep values={goalData.holdingBackFactors} onComplete={handleComplete} onBack={handleBack} />;
      default:
        return null;
    }
  };

  // Adjust current step for progress bar when maintenance is selected
  const progressStep = goalData.desiredGoal === 'maintain' && currentStep === 3 ? 1 : currentStep;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ProgressBar currentStep={progressStep} totalSteps={totalSteps} />
      <View style={styles.content}>
        {renderStep()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
