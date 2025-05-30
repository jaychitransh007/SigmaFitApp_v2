import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import CircularProgress from '../CircularProgress';

interface CaloriesCardProps {
  caloriesLeft: number;
  caloriesGoal: number;
}

export default function CaloriesCard({ caloriesLeft, caloriesGoal }: CaloriesCardProps) {
  const theme = useAppTheme();
  const caloriesConsumed = caloriesGoal - caloriesLeft;
  const progress = caloriesConsumed / caloriesGoal;

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} mode="contained">
      <Card.Content style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={[
            styles.caloriesValue,
            { 
              color: theme.custom.colors.text.primary,
              fontWeight: theme.custom.typography.weights.bold,
            }
          ]}>
            {caloriesLeft}
          </Text>
          <Text style={[
            styles.caloriesLabel,
            { 
              color: theme.custom.colors.text.secondary,
              fontWeight: theme.custom.typography.weights.regular,
            }
          ]}>
            Calories left
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <CircularProgress
            size={100}
            strokeWidth={3}
            progress={progress}
            color={theme.custom.colors.accent.orange}
            backgroundColor={theme.custom.colors.progressTrack}
          >
            <MaterialCommunityIcons
              name="fire"
              size={32}
              color={theme.custom.colors.accent.orange}
            />
          </CircularProgress>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0,
  },
  cardContent: {
    paddingVertical: 32,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  caloriesValue: {
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: -1,
  },
  caloriesLabel: {
    fontSize: 18,
    lineHeight: 24,
  },
  progressContainer: {
    marginLeft: 24,
  },
});