import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Users from './users/users';
import { AddIcon, Icon } from '@gluestack-ui/themed';
import Profile from './profile';
import Friends from './friends';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Tabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="My Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="New Buddy"
        component={Users}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome5 name="dog" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome5 name="user-friends" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
