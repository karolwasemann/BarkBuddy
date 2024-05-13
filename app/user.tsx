import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  VStack,
  View,
  Image,
  Text,
} from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { UserProfile, addFriend, getUserData } from '../db/user';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../provider/AuthContext';

export default function UserDetails() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return null;
  }
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserData(userId);
      setUser(userData);
    };
    fetchUser();
  }, [userId]);
  return (
    <View>
      <Image
        mb="$6"
        h={240}
        width="$full"
        borderRadius="$md"
        source={{
          uri: user?.photoURL || '',
        }}
        alt="User Photo"
      />
      <Box p="$2" gap="$4">
        <Text fontSize="$lg" bold>
          {user?.name}
        </Text>
        <Text fontSize="$lg">{user?.breed}</Text>
        <Text size="md" fontFamily="$heading">
          {user?.desc}
        </Text>
        <Box flexDirection="row" mt="$4" gap="$4" justifyContent="flex-end">
          <Button
            px="$4"
            py="$2"
            variant="outline"
            borderColor="$borderLight300"
            $dark-borderColor="$backgroundDark600"
            gap="$2"
            alignItems="center"
            size="lg"
          >
            <ButtonText
              size="md"
              color="$textLight600"
              $dark-color="$textDark400"
            >
              Chat
            </ButtonText>
            <Ionicons name="chatbubbles-outline" size={24} color="black" />
          </Button>
          <Button
            px="$4"
            py="$2"
            mr="$0"
            mb="$3"
            size="lg"
            gap="$2"
            onPress={async () => await addFriend(currentUser?.uid, userId)}
          >
            <ButtonText>Add Buddy</ButtonText>
            <AntDesign name="adduser" size={24} color="white" />
          </Button>
        </Box>
      </Box>
    </View>
  );
}
