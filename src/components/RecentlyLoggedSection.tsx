import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme';
import FoodItem from './FoodItem';

interface FoodItemData {
  id: string;
  name: string;
  calories: number;
  time: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface RecentlyLoggedSectionProps {
  items: FoodItemData[];
}

export default function RecentlyLoggedSection({ items }: RecentlyLoggedSectionProps) {
  const theme = useAppTheme();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[
          styles.sectionTitle,
          { 
            color: theme.custom.colors.text.primary,
            fontSize: theme.custom.typography.sizes.bodyLarge,
            fontWeight: theme.custom.typography.weights.semiBold,
          }
        ]}>
          Recently logged
        </Text>
        
        <View style={[styles.emptyState, { backgroundColor: theme.colors.surface }]}>
          <Text style={[
            styles.emptyTitle,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
              fontWeight: theme.custom.typography.weights.medium,
            }
          ]}>
            You haven't uploaded any food
          </Text>
          <Text style={[
            styles.emptySubtext,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyMedium,
            }
          ]}>
            Start tracking today's meals by taking a quick picture.
          </Text>
          
          <View style={styles.arrowContainer}>
            <MaterialCommunityIcons
              name="arrow-down-right"
              size={48}
              color={theme.custom.colors.text.secondary}
              style={styles.arrow}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[
        styles.sectionTitle,
        { 
          color: theme.custom.colors.text.primary,
          fontSize: theme.custom.typography.sizes.bodyLarge,
          fontWeight: theme.custom.typography.weights.semiBold,
        }
      ]}>
        Recently logged
      </Text>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodItem item={item} />}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  emptyState: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptySubtext: {
    textAlign: 'center',
    lineHeight: 22,
  },
  arrowContainer: {
    marginTop: 16,
    alignSelf: 'flex-end',
    marginRight: -8,
  },
  arrow: {
    transform: [{ rotate: '-15deg' }],
  },
});