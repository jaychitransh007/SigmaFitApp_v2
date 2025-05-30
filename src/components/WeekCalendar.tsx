import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../hooks/useAppTheme';

interface WeekCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function WeekCalendar({ selectedDate, onDateSelect }: WeekCalendarProps) {
  const theme = useAppTheme();
  
  // Get the current week
  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay;
    const sunday = new Date(today.setDate(diff));
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates();
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {weekDates.map((date, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onDateSelect(date)}
          style={[
            styles.dayContainer,
            isSelected(date) && styles.selectedDay,
            isSelected(date) && { backgroundColor: theme.colors.primary }
          ]}
        >
          <Text style={[
            styles.dayName,
            {
              color: isSelected(date) 
                ? theme.colors.background 
                : theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodySmall,
              fontWeight: theme.custom.typography.weights.medium,
            }
          ]}>
            {dayNames[index]}
          </Text>
          <Text style={[
            styles.dayNumber,
            {
              color: isSelected(date) 
                ? theme.colors.background 
                : theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.bodyLarge,
              fontWeight: isToday(date) || isSelected(date)
                ? theme.custom.typography.weights.bold
                : theme.custom.typography.weights.regular,
            }
          ]}>
            {date.getDate()}
          </Text>
          {isToday(date) && !isSelected(date) && (
            <View style={[styles.todayIndicator, { backgroundColor: theme.colors.primary }]} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 72,
    borderRadius: 36,
    marginHorizontal: 4,
  },
  selectedDay: {
    transform: [{ scale: 1.05 }],
  },
  dayName: {
    marginBottom: 4,
  },
  dayNumber: {
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});