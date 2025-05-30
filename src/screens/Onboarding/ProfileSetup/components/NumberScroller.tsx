import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../../hooks/useAppTheme';

interface NumberScrollerProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  formatValue?: (value: number) => string;
  style?: any;
}

export default function NumberScroller({ 
  value, 
  onChange, 
  min, 
  max, 
  unit, 
  formatValue = (val: number) => val.toString(),
  style 
}: NumberScrollerProps) {
  const theme = useAppTheme();

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity 
        onPress={handleDecrement}
        disabled={value <= min}
        style={styles.button}
      >
        <MaterialCommunityIcons 
          name="minus" 
          size={24} 
          color={value <= min ? theme.custom.colors.text.secondary : theme.colors.primary} 
        />
      </TouchableOpacity>

      <View style={styles.valueContainer}>
        <Text style={[
          styles.value,
          { 
            color: theme.custom.colors.text.primary,
            fontSize: theme.custom.typography.sizes.headerLarge,
            fontWeight: theme.custom.typography.weights.bold
          }
        ]}>
          {formatValue ? formatValue(value) : value}
        </Text>
        <Text style={[
          styles.unit,
          { 
            color: theme.custom.colors.text.secondary,
            fontSize: theme.custom.typography.sizes.bodyLarge
          }
        ]}>
          {unit}
        </Text>
      </View>

      <TouchableOpacity 
        onPress={handleIncrement}
        disabled={value >= max}
        style={styles.button}
      >
        <MaterialCommunityIcons 
          name="plus" 
          size={24} 
          color={value >= max ? theme.custom.colors.text.secondary : theme.colors.primary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    minWidth: 80,
    height: '100%',
  },
  button: {
    padding: 8,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 4,
  },
  value: {
    // Styles applied inline
  },
  unit: {
    // Styles applied inline
  },
});