import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import { useAppTheme } from '../../hooks/useAppTheme';

interface NutrientCardProps {
  name: string;
  value: number;
  unit: string;
  goal: number;
  color: string;
}

export const NutrientCard: React.FC<NutrientCardProps> = ({
  name,
  value,
  unit,
  goal,
  color,
}) => {
  const theme = useAppTheme();
  const progress = value / goal;
  
  return (
    <Card style={styles.card} mode="contained">
      <Card.Content>
        <View style={styles.header}>
          <Text style={[
            styles.value,
            { color: theme.custom.colors.text.primary }
          ]}>
            {value}{unit}
          </Text>
          <Text style={[
            styles.goal,
            { color: theme.custom.colors.text.secondary }
          ]}>
            / {goal}{unit}
          </Text>
        </View>
        
        <ProgressBar
          progress={progress}
          color={color}
          style={styles.progressBar}
        />
        
        <Text style={[
          styles.label,
          { color: theme.custom.colors.text.secondary }
        ]}>
          {name}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 26,
    fontWeight: '400',
  },
  goal: {
    fontSize: 15,
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
  },
});