import { View, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Text,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  Box,
  Divider,
} from '@gluestack-ui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '../app/_layout';
import { Chat } from '../app/(tabs)/chats';
import formatDate from '../util/dateFormat';
import { useAuth } from '../provider/AuthContext';
import { UserProfile, getUserData } from '../services/user';

type ChatNavigationProp = StackNavigationProp<RootStackParamList, 'chat'>;
type ChatItemProps = {
  chat: Chat;
};
export default function ChatItem({ chat }: ChatItemProps) {
  const { currentUser } = useAuth();
  const navigation = useNavigation<ChatNavigationProp>();
  const buddyId = chat.participants.filter((id) => id !== currentUser?.uid)[0];
  const [buddy, setBuddy] = useState({} as UserProfile);
  useEffect(() => {
    const getBuddy = async () => {
      const buddy = await getUserData(buddyId);
      setBuddy(buddy);
    };
    getBuddy();
  }, [chat]);
  const handlePress = (id: string[]) => {
    const chatId = id.sort().join('-');
    console.log('🚀 ~ handlePress ~ chatId:', chatId);
    navigation.navigate('chat', {
      conversationId: chatId,
      userId: currentUser?.uid || '',
    });
  };
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Pressable onPress={() => handlePress(chat.participants)}>
          <HStack p="$3" gap="$6" backgroundColor="$white" width={'$full'}>
            <Avatar size="lg">
              <AvatarFallbackText>{buddy?.name}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: buddy?.photoURL || '',
                }}
                alt="Avatar user"
              />
            </Avatar>
            <VStack flexGrow={1} p="$2">
              <Box flexDirection="row" justifyContent="space-between">
                <Text size="md">{buddy?.name}</Text>
                <Text size="sm">
                  {formatDate(chat.lastMessageTime.toDate())}
                </Text>
              </Box>
              <Text size="sm">{chat.lastMessage}</Text>
            </VStack>
          </HStack>
          <Divider mt="$0.5" mb="$1.5" />
        </Pressable>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
