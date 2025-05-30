import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { onboardingStyles } from '../../../../screens/Onboarding/styles';

interface NameStepProps {
  value: string;
  onNext: (data: { name: string }) => void;
}

export default function NameStep({ value, onNext }: NameStepProps) {
  const theme = useAppTheme();
  const [name, setName] = useState(value);

  const handleNext = () => {
    if (name.trim()) {
      onNext({ name: name.trim() });
    }
  };

  const styles = StyleSheet.create({
    input: {
      width: '100%',
      fontSize: theme.custom.typography.sizes.bodyLarge,
      backgroundColor: theme.colors.surface,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={onboardingStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
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
            What's your name?
          </Text>
          <Text style={[
            onboardingStyles.subtitle,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyLarge
            }
          ]}>
            Let's start with something simple
          </Text>
        </View>

        <View style={onboardingStyles.inputContainer}>
          <View style={onboardingStyles.inputWrapper}>
            <TextInput
              value={name}
              onChangeText={setName}
              mode="outlined"
              label="Your name"
              placeholder="Enter your name"
              style={styles.input}
              outlineStyle={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.outline,
              }}
              contentStyle={{
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
              textColor={theme.custom.colors.text.primary}
              activeOutlineColor={theme.colors.primary}
              autoFocus
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={handleNext}
              theme={{
                colors: {
                  onSurfaceVariant: theme.colors.onSurfaceVariant,
                  primary: theme.colors.primary,
                },
                roundness: 12,
              }}
            />
          </View>
        </View>
      </View>

      <View style={onboardingStyles.footer}>
        <Button
          mode="contained"
          onPress={handleNext}
          disabled={!name.trim()}
          style={[onboardingStyles.button, onboardingStyles.nextButton, { flex: 1 }]} 
          contentStyle={onboardingStyles.buttonContent}
          icon="arrow-right"
        >
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}