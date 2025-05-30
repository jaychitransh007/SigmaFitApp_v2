import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useAppTheme } from '../../../../hooks/useAppTheme';

interface DateScrollerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DateScroller({ selectedDate, onDateChange }: DateScrollerProps) {
  const theme = useAppTheme();
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleDateChange = (type: 'day' | 'month' | 'year', value: number) => {
    const newDate = new Date(selectedDate);
    if (type === 'day') newDate.setDate(value);
    if (type === 'month') newDate.setMonth(value);
    if (type === 'year') newDate.setFullYear(value);
    onDateChange(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.scrollerContainer, { backgroundColor: theme.colors.surface }]}>
        {/* Day Scroller */}
        <View style={styles.scroller}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            snapToInterval={50}
            decelerationRate="fast"
          >
            {days.map(day => (
              <Text
                key={day}
                style={[
                  styles.scrollerItem,
                  selectedDate.getDate() === day && styles.selectedItem,
                  { color: selectedDate.getDate() === day ? theme.colors.primary : theme.custom.colors.text.secondary }
                ]}
                onPress={() => handleDateChange('day', day)}
              >
                {day}
              </Text>
            ))}
          </ScrollView>
        </View>

        {/* Month Scroller */}
        <View style={styles.scroller}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            snapToInterval={50}
            decelerationRate="fast"
          >
            {months.map((month, index) => (
              <Text
                key={month}
                style={[
                  styles.scrollerItem,
                  selectedDate.getMonth() === index && styles.selectedItem,
                  { color: selectedDate.getMonth() === index ? theme.colors.primary : theme.custom.colors.text.secondary }
                ]}
                onPress={() => handleDateChange('month', index)}
              >
                {month}
              </Text>
            ))}
          </ScrollView>
        </View>

        {/* Year Scroller */}
        <View style={styles.scroller}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            snapToInterval={50}
            decelerationRate="fast"
          >
            {years.map(year => (
              <Text
                key={year}
                style={[
                  styles.scrollerItem,
                  selectedDate.getFullYear() === year && styles.selectedItem,
                  { color: selectedDate.getFullYear() === year ? theme.colors.primary : theme.custom.colors.text.secondary }
                ]}
                onPress={() => handleDateChange('year', year)}
              >
                {year}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  scrollerContainer: {
    flexDirection: 'row',
    height: '100%',
    borderRadius: 16,
    padding: 16,
  },
  scroller: {
    flex: 1,
    height: '100%',
  },
  scrollerItem: {
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
  selectedItem: {
    fontWeight: '600',
    fontSize: 20,
  },
});