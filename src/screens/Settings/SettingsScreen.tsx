import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../context/AuthContext';

export default function SettingsScreen() {
  const theme = useAppTheme();
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            { 
              color: theme.custom.colors.text.primary,
              fontSize: theme.custom.typography.sizes.headerLarge,
              fontWeight: theme.custom.typography.weights.bold
            }
          ]}>
            Settings
          </Text>
        </View>

        {/* Profile Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <List.Item
            title={user?.name || 'User'}
            description={user?.phoneNumber || 'Phone number'}
            left={props => <List.Icon {...props} icon="account-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Edit profile')}
          />
        </View>

        {/* Preferences Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <List.Item
            title="Daily Goals"
            description="Set your nutrition targets"
            left={props => <List.Icon {...props} icon="target" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Daily Goals')}
          />
          <Divider />
          <List.Item
            title="Notifications"
            description="Meal tracking reminders"
            left={props => <List.Icon {...props} icon="bell-outline" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={theme.colors.primary}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Units"
            description="Metric"
            left={props => <List.Icon {...props} icon="ruler" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Units')}
          />
        </View>

        {/* Data Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <List.Item
            title="Export Data"
            description="Download your nutrition history"
            left={props => <List.Icon {...props} icon="download" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Export Data')}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Privacy Policy')}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log('Terms of Service')}
          />
        </View>

        {/* About Section */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <List.Item
            title="About"
            description="Version 1.0.0"
            left={props => <List.Icon {...props} icon="information-outline" />}
            onPress={() => console.log('About')}
          />
        </View>

        {/* Sign Out */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <List.Item
            title="Sign Out"
            titleStyle={{ color: theme.colors.error }}
            left={props => <List.Icon {...props} icon="logout" color={theme.colors.error} />}
            onPress={signOut}
          />
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
});