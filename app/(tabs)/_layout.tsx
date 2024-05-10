import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../profile';
import Users from '../users';
import { AddIcon, Icon } from '@gluestack-ui/themed';

export default function Tabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon as={AddIcon} />,
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon as={AddIcon} />,
        }}
      />
    </Tab.Navigator>
  );
}
