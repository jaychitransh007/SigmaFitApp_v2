import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme';

interface FoodItemProps {
  item: {
    id: string;
    name: string;
    calories: number;
    time: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  };
}

export default function FoodItem({ item }: FoodItemProps) {
  const theme = useAppTheme();

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'weather-sunny';
      case 'lunch':
        return 'white-balance-sunny';
      case 'dinner':
        return 'weather-night';
      case 'snack':
        return 'cookie';
      default:
        return 'food';
    }
  };

  const getMealColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return theme.custom.colors.accent.orange;
      case 'lunch':
        return theme.custom.colors.accent.blue;
      case 'dinner':
        return theme.custom.colors.accent.deepBlue;
      case 'snack':
        return theme.custom.colors.accent.coral;
      default:
        return theme.custom.colors.text.secondary;
    }
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={[
        styles.iconContainer,
        { backgroundColor: getMealColor(item.mealType) + '15' }
      ]}>
        <MaterialCommunityIcons
          name={getMealIcon(item.mealType) as any}
          size={24}
          color={getMealColor(item.mealType)}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={[
          styles.name,
          { 
            color: theme.custom.colors.text.primary,
            fontSize: theme.custom.typography.sizes.bodyMedium,
            fontWeight: theme.custom.typography.weights.medium,
          }
        ]}>
          {item.name}
        </Text>
        <Text style={[
          styles.time,
          { 
            color: theme.custom.colors.text.secondary,
            fontSize: theme.custom.typography.sizes.bodySmall,
          }
        ]}>
          {item.time}
        </Text>
      </View>
      
      <Text style={[
        styles.calories,
        { 
          color: theme.custom.colors.text.primary,
          fontSize: theme.custom.typography.sizes.bodyMedium,
          fontWeight: theme.custom.typography.weights.semiBold,
        }
      ]}>
        {item.calories} cal
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
  },
  time: {
  },
  calories: {
    marginLeft: 12,
  },
});