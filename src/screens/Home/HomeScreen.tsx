import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, FAB, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import CaloriesCard from '../../components/cards/CaloriesCard';
import MacroCard from '../../components/cards/MacroCard';
import WeekCalendar from '../../components/WeekCalendar';
import RecentlyLoggedSection from '../../components/RecentlyLoggedSection';

export default function HomeScreen() {
  const theme = useAppTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with actual data from your state management
  const nutritionData = {
    caloriesLeft: 2250,
    caloriesGoal: 2500,
    proteinLeft: 178,
    proteinGoal: 180,
    carbsLeft: 243,
    carbsGoal: 250,
    fatLeft: 62,
    fatGoal: 70,
  };

  const recentlyLogged = []; // Empty for now

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons 
              name="nutrition" 
              size={32} 
              color={theme.colors.primary} 
            />
            <Text style={[
              styles.appName,
              { 
                color: theme.custom.colors.text.primary,
                fontSize: theme.custom.typography.sizes.headerMedium,
                fontWeight: theme.custom.typography.weights.bold
              }
            ]}>
              Sigma Fit
            </Text>
          </View>
          
          <View style={styles.headerRight}>
            <View style={styles.streakContainer}>
              <MaterialCommunityIcons 
                name="fire" 
                size={20} 
                color={theme.custom.colors.accent.orange} 
              />
              <Text style={[
                styles.streakText,
                { 
                  color: theme.custom.colors.text.primary,
                  fontSize: theme.custom.typography.sizes.bodyMedium,
                  fontWeight: theme.custom.typography.weights.medium
                }
              ]}>
                3
              </Text>
            </View>
          </View>
        </View>

        {/* Week Calendar */}
        <WeekCalendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {/* Calories Card */}
        <View style={styles.caloriesSection}>
          <CaloriesCard 
            caloriesLeft={nutritionData.caloriesLeft}
            caloriesGoal={nutritionData.caloriesGoal}
          />
        </View>

        {/* Macros Cards */}
        <View style={styles.macrosContainer}>
          <MacroCard
            type="protein"
            value={nutritionData.proteinLeft}
            goal={nutritionData.proteinGoal}
            unit="g"
          />
          <MacroCard
            type="carbs"
            value={nutritionData.carbsLeft}
            goal={nutritionData.carbsGoal}
            unit="g"
          />
          <MacroCard
            type="fat"
            value={nutritionData.fatLeft}
            goal={nutritionData.fatGoal}
            unit="g"
          />
        </View>

        {/* Recently Logged Section */}
        <RecentlyLoggedSection items={recentlyLogged} />

        {/* Bottom padding for FAB */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={[
          styles.fab,
          { backgroundColor: theme.custom.colors.text.primary }
        ]}
        color={theme.colors.background}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appName: {
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 167, 38, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
  },
  caloriesSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  macrosContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 32,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
});