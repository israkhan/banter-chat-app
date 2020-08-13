import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ProfileSettings from '../screens/Settings/ProfileSettings';
import Notification from '../screens/Settings/NotificationSettings';

const Stack = createStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{ title: 'Profile Information' }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={Notification}
        options={{ title: 'Notification' }}
      />
    </Stack.Navigator>
  );
}
