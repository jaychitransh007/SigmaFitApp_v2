import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
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

  // Define the FoodItemData interface for recently logged food items
  interface FoodItemData {
    id: string;
    name: string;
    calories: number;
    time: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  }
  
  // For now, we'll just use FoodItemData[] since that's what RecentlyLoggedSection expects
  // If you need to track workouts separately, you can create a separate state for them
  const [recentlyLogged, setRecentlyLogged] = useState<FoodItemData[]>([]);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'web') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
          return false;
        }
      } else {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera permissions to make this work!');
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Failed to request permissions. Please check your settings.');
      return false;
    }
  };

  const handleAddFood = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Here you would typically process the image
        // For now, we'll just log the result
        console.log('Image captured:', result.assets[0].uri);
        
        // TODO: Add your image processing logic here
        // For example, you might want to upload the image to a server
        // or process it locally to extract food information
        
        // Mock adding a new food item
        const newFoodItem: FoodItemData = {
          id: Date.now().toString(),
          name: 'Captured Food',
          calories: 0, // You would calculate this based on the image analysis
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mealType: 'lunch', // You might want to let the user select this
        };
        
        setRecentlyLogged(prev => [newFoodItem, ...prev]);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

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
        onPress={handleAddFood}
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