import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { firestore } from '../../firebaseConfig'; // Adjust the import according to your file structure
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../../provider/AuthContext';
import { SafeAreaView } from '@gluestack-ui/themed';

import { useIsFocused } from '@react-navigation/native';

import ChatItem from '../../components/ChatItem';
import theme from '../../theme';

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
      setChats(fetchedChats);
    };
    fetchChats();
  }, [isFocused, userId]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} />}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
export default Chats;
