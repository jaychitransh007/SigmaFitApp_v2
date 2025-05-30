import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';

// Import step components
import NameStep from './steps/NameStep';
import DateOfBirthStep from './steps/DateOfBirthStep';
import GenderStep from './steps/GenderStep';
import HeightWeightStep from './steps/HeightWeightStep';
import DietaryPreferenceStep from './steps/DietaryPreferenceStep';
import ConfirmationStep from './steps/ConfirmationStep';
import ProgressBar from './components/ProgressBar';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSetup'>;

export interface ProfileData {
  name: string;
  dateOfBirth: Date;
  gender: string;
  height: number;
  weight: number;
  dietaryPreferences: string;
}

export default function ProfileSetupScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { updateUserProfile } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    dateOfBirth: new Date(2000, 0, 1),
    gender: '',
    height: 175,
    weight: 70,
    dietaryPreferences: '',
  });

  const totalSteps = 6;

  const handleNext = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await updateUserProfile({
        name: profileData.name,
        hasProfile: true,
      });
      // Save full profile data to your backend here
      navigation.navigate('GoalSetting');
    } catch (error) {
      console.error('Profile save failed:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <NameStep value={profileData.name} onNext={handleNext} />;
      case 1:
        return <DateOfBirthStep value={profileData.dateOfBirth} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <GenderStep value={profileData.gender} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <HeightWeightStep height={profileData.height} weight={profileData.weight} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <DietaryPreferenceStep value={profileData.dietaryPreferences} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <ConfirmationStep profileData={profileData} onComplete={handleComplete} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
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