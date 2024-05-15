import { View, Text } from 'react-native';
import React from 'react';
import {
  Box,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  Heading,
  Divider,
  Pressable,
} from '@gluestack-ui/themed';
import { UserProfile } from '../services/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/_layout';
import { useNavigation } from 'expo-router';
import theme from '../theme';
type FriendProps = {
  user: UserProfile;
};
type UserNavigationProp = StackNavigationProp<RootStackParamList, 'user'>;
export default function Friend({ user }: FriendProps) {
  const navigation = useNavigation<UserNavigationProp>();

  const handlePress = () => {
    navigation.navigate('user', { userId: user?.uid || '' });
  };
  return (
    <>
      <Pressable onPress={handlePress}>
        <Box flexDirection="row">
          <Avatar size="lg" mr="$3">
            <AvatarFallbackText fontFamily="$heading">RR</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user?.photoURL || '',
              }}
              alt="User Avatar"
            />
          </Avatar>
          <VStack>
            <Heading size="md" mb="$1" bold color={theme.colors.pri}>
              {user?.name}
            </Heading>
            <Heading size="sm" color={theme.colors.text}>
              {user?.city}
            </Heading>
          </VStack>
        </Box>
      </Pressable>
      <Divider mt="$0.5" mb="$1.5" />
    </>
  );
}
