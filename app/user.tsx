import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function UserDetails() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  return <Text>userDetails {userId}</Text>;
}
