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
import { UserProfile } from '../services/user';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useNavigation } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../app/_layout';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '../theme';
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
      <TouchableOpacity onPress={handlePress}>
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
          <Heading size="md" color={theme.colors.pri}>
            {user?.name}
          </Heading>
          <Text size="md">{user?.breed}</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text size="md" color={theme.colors.text}>
              {user?.city}
            </Text>
            <MaterialIcons
              name="read-more"
              size={24}
              color={theme.colors.text}
            />
          </HStack>
        </VStack>
      </TouchableOpacity>
    </Card>
  );
}
