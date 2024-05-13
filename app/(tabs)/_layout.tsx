import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Users from './users/users';
import { AddIcon, Icon } from '@gluestack-ui/themed';
import Profile from './profile';

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
