import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Users from './users/users';
import { AddIcon, Button, Icon } from '@gluestack-ui/themed';
import Profile from './profile';
import Friends from './friends';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Chats from './chats';
import theme from '../../theme';
import { useAuth } from '../../provider/AuthContext';

export default function Tabs() {
  const Tab = createBottomTabNavigator();
  const { currentUser, logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: theme.colors.back,
        },
        tabBarActiveTintColor: theme.colors.pri,
        tabBarInactiveTintColor: theme.colors.accent,
        tabBarLabelStyle: {
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          title: currentUser?.displayName || 'Profile',
          headerStyle: {
            backgroundColor: theme.colors.back,
          },
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color={focused ? theme.colors.pri : theme.colors.accent}
            />
          ),
          headerRight: () => (
            <Button
              size="md"
              variant="link"
              action="primary"
              justifyContent="center"
              onPress={logout}
              mr="$2"
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.pri} />
            </Button>
          ),
        }}
      />
      <Tab.Screen
        name="New Buddy"
        component={Users}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="dog"
              size={24}
              color={focused ? theme.colors.pri : theme.colors.accent}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-friends"
              size={24}
              color={focused ? theme.colors.pri : theme.colors.accent}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="wechat"
              size={24}
              color={focused ? theme.colors.pri : theme.colors.accent}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
