// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function HomeScreen() {
  const theme = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[
            styles.greeting,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.headerLarge,
              fontWeight: theme.custom.typography.weights.bold
            }
          ]}>
            Hello, Sigma
          </Text>
          
          <View style={styles.streakContainer}>
            <MaterialCommunityIcons 
              name="fire" 
              size={24} 
              color={theme.custom.colors.accent.orange} 
            />
            <Text style={[
              styles.streakText,
              { 
                color: theme.custom.colors.accent.orange,
                fontSize: theme.custom.typography.sizes.headerMedium,
                fontWeight: theme.custom.typography.weights.semiBold
              }
            ]}>
              3 days
            </Text>
          </View>
        </View>

        {/* Today's Nutrition Section */}
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
              fontWeight: theme.custom.typography.weights.medium
            }
          ]}>
            Today's Nutrition
          </Text>
        </View>

        {/* Empty State */}
        <View style={[styles.emptyState, { backgroundColor: theme.colors.surface }]}>
          <MaterialCommunityIcons 
            name="food-apple-outline" 
            size={48} 
            color={theme.custom.colors.text.secondary} 
          />
          <Text style={[
            styles.emptyStateTitle,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.bodyMedium,
              fontWeight: theme.custom.typography.weights.medium
            }
          ]}>
            You haven't uploaded any food
          </Text>
          <Text style={[
            styles.emptyStateSubtext,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyMedium
            }
          ]}>
            Start tracking today's meals to see your nutrition breakdown
          </Text>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={[
          styles.fab,
          { backgroundColor: theme.colors.primary }
        ]}
        onPress={() => console.log('Add food')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    // Font styles applied inline with theme
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streakText: {
    // Font styles applied inline with theme
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    // Font styles applied inline with theme
  },
  emptyState: {
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  emptyStateTitle: {
    textAlign: 'center',
  },
  emptyStateSubtext: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
