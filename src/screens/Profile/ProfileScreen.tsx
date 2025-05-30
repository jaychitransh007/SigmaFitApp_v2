import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Card, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function ProfileScreen() {
  const theme = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar.Text 
            size={80} 
            label="S" 
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Text style={[
            styles.userName,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.headerMedium,
              fontWeight: theme.custom.typography.weights.semiBold
            }
          ]}>
            Sigma
          </Text>
          <Text style={[
            styles.userEmail,
            { 
              color: theme.custom.colors.text.secondary,
              fontSize: theme.custom.typography.sizes.bodyMedium
            }
          ]}>
            sigma@example.com
          </Text>
        </View>

        {/* Stats Card */}
        <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.custom.colors.accent.orange }]}>
                  3
                </Text>
                <Text style={[styles.statLabel, { color: theme.custom.colors.text.secondary }]}>
                  Day Streak
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                  15
                </Text>
                <Text style={[styles.statLabel, { color: theme.custom.colors.text.secondary }]}>
                  Foods Logged
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.custom.colors.accent.green }]}>
                  7
                </Text>
                <Text style={[styles.statLabel, { color: theme.custom.colors.text.secondary }]}>
                  Goals Met
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Settings List */}
        <Card style={[styles.settingsCard, { backgroundColor: theme.colors.surface }]}>
          <List.Item
            title="Daily Goals"
            description="Set your nutrition targets"
            left={props => <List.Icon {...props} icon="target" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Daily Goals')}
          />
          <List.Item
            title="Reminders"
            description="Meal tracking notifications"
            left={props => <List.Icon {...props} icon="bell-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Reminders')}
          />
          <List.Item
            title="Export Data"
            description="Download your nutrition history"
            left={props => <List.Icon {...props} icon="download" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Export Data')}
          />
          <List.Item
            title="About"
            description="App version and info"
            left={props => <List.Icon {...props} icon="information-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('About')}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  userName: {
    marginTop: 16,
  },
  userEmail: {
    marginTop: 4,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  settingsCard: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});