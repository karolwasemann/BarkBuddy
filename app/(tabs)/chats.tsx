import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { firestore } from '../../firebaseConfig'; // Adjust the import according to your file structure
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../../provider/AuthContext';
import {
  Avatar,
  Text,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
  Box,
  SafeAreaView,
  Divider,
  Pressable,
} from '@gluestack-ui/themed';
import { UserProfile } from '../../services/user';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../_layout';
import ChatItem from '../../components/ChatItem';

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Timestamp;
  lastMessageSender: string;
}

const Chats = () => {
  const isFocused = useIsFocused(); // Hook to check if the screen is focused

  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const q = query(
        collection(firestore, 'conversations'),
        where('participants', 'array-contains', userId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedChats = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Chat)
      );
      console.log('🚀 ~ fetchChats ~ fetchedChats:', fetchedChats);
      setChats(fetchedChats);
    };
    console.log('🚀 ~ fetchChats ~ userId:', userId);

    fetchChats();
  }, [isFocused, userId]);

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} />}
      />
    </View>
  );
};

export default Chats;
