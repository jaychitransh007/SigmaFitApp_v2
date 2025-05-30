import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import CircularProgress from '../../components/CircularProgress';

interface MacroCardProps {
  type: 'protein' | 'carbs' | 'fat';
  value: number;
  goal: number;
  unit: string;
}

export default function MacroCard({ type, value, goal, unit }: MacroCardProps) {
  const theme = useAppTheme();
  const consumed = goal - value;
  const progress = consumed / goal;

  const getIcon = () => {
    switch (type) {
      case 'protein':
        return 'food-drumstick';
      case 'carbs':
        return 'barley';
      case 'fat':
        return 'water';
      default:
        return 'circle';
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'protein':
        return 'Protein left';
      case 'carbs':
        return 'Carbs left';
      case 'fat':
        return 'Fat left';
      default:
        return '';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'protein':
        return theme.custom.colors.accent.red;
      case 'carbs':
        return theme.custom.colors.accent.orange;
      case 'fat':
        return theme.custom.colors.accent.blue;
      default:
        return theme.custom.colors.text.secondary;
    }
  };

  const getProgressColor = () => {
    // Fat shows filled progress, others show minimal
    if (type === 'fat' && progress > 0.3) {
      return theme.custom.colors.text.primary;
    }
    return theme.custom.colors.progressTrack;
  };

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} mode="contained">
      <Card.Content style={styles.cardContent}>
        <View style={styles.textSection}>
          <Text style={[
            styles.value,
            { 
              color: theme.custom.colors.text.primary,
              fontWeight: theme.custom.typography.weights.bold,
            }
          ]}>
            {value}{unit}
          </Text>
          <Text style={[
            styles.label,
            { 
              color: theme.custom.colors.text.secondary,
              fontWeight: theme.custom.typography.weights.regular,
            }
          ]}>
            {getLabel()}
          </Text>
        </View>
        
        <View style={styles.progressSection}>
          <CircularProgress
            size={64}
            strokeWidth={3}
            progress={type === 'fat' ? progress : 0} // Only show progress for fat as in screenshot
            color={getProgressColor()}
            backgroundColor={theme.custom.colors.progressTrack}
          >
            <MaterialCommunityIcons
              name={getIcon() as any}
              size={24}
              color={getIconColor()}
            />
          </CircularProgress>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0,
  },
  cardContent: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  value: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
  progressSection: {
    alignItems: 'center',
  },
});