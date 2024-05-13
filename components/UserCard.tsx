import {
  Card,
  VStack,
  Heading,
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  Image,
  Text,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Icon,
  ArrowRightIcon,
} from '@gluestack-ui/themed';
import React from 'react';
import { UserProfile } from '../db/user';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../app/_layout';
import { StackNavigationProp } from '@react-navigation/stack';
type UserCardProps = {
  user: UserProfile;
};
type UserNavigationProp = StackNavigationProp<RootStackParamList, 'user'>;

export default function UserCard({ user }: UserCardProps) {
  const navigation = useNavigation<UserNavigationProp>();

  const handlePress = () => {
    navigation.navigate('user', { userId: user?.uid || '' });
  };
  return (
    <Card p="$0" borderRadius="$lg" m="$2" width={'45%'}>
      <Image
        source={{
          uri: user?.photoURL || '',
        }}
        alt="User photo"
        width={'$full'}
        height={130}
        borderRadius="$lg"
        resizeMode="cover"
      />
      <VStack py="$3" px="$2">
        <Heading size="md">{user?.name}</Heading>
        <Text size="md">{user?.breed}</Text>
        <HStack justifyContent="space-between" alignItems="center">
          <Text size="md">{user?.city}</Text>
          <TouchableOpacity onPress={handlePress}>
            <MaterialIcons name="read-more" size={24} color="black" />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </Card>
  );
}
