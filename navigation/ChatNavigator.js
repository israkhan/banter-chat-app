/* eslint-disable react/display-name */
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SingleChatScreen } from '../screens';
import {
  ChatListHeaderRight,
  SingleChatHeaderLeft,
  SingleChatHeaderCenter,
  NewIndividualChat,
  NewGroupChat,
} from '../components';
import ChatTabNavigator from './ChatTabNavigator';

const Stack = createStackNavigator();

export default function ChatNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      navigationOptions={{ tabBarVisible: false }}
    >
      <Stack.Screen
        name="Chat"
        component={ChatTabNavigator}
        options={({ navigation }) => ({
          title: 'All Chats',
          headerRight: () => <ChatListHeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="SingleChat"
        component={SingleChatScreen}
        options={{
          title: 'Single Chat',
          gestureEnabled: false,
          headerTitle: () => <SingleChatHeaderCenter />,
          headerLeft: () => (
            <SingleChatHeaderLeft
              navigation={navigation}
              route={route}
              back="Chat"
            />
          ),
          headerStyle: { height: 130 },
        }}
        navigationOptions={{ tabBarVisible: false }}
      />

      <Stack.Screen
        name="NewIndividualChat"
        component={NewIndividualChat}
        options={{
          title: 'New Chat',
        }}
      />

      <Stack.Screen
        name="NewGroupChat"
        component={NewGroupChat}
        options={{
          title: 'New Group',
        }}
      />
    </Stack.Navigator>
  );
}
