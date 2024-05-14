import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Platform,
  TextInput,
} from 'react-native';
import { readMessages, sendMessage } from '../services/chats';
import { useLocalSearchParams } from 'expo-router';
import {
  HStack,
  VStack,
  Button,
  ButtonIcon,
  Input,
  InputField,
  Box,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from '@gluestack-ui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
};

const Chat = () => {
  const { conversationId, userId } = useLocalSearchParams<{
    conversationId: string;
    userId: string;
  }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await readMessages(conversationId);
        const mappedMessages = fetchedMessages.map((msg) => ({
          id: msg.id,
          senderId: msg.senderId,
          text: msg.text,
          timestamp: new Date(msg.timestamp.seconds * 1000),
        }));
        setMessages(mappedMessages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      await sendMessage(conversationId, userId, newMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: new Date().toISOString(),
          senderId: userId,
          text: newMessage,
          timestamp: new Date(),
        },
      ]);
      setNewMessage('');
    }
  };
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(
        () => {
          flatListRef?.current?.scrollToEnd({ animated: true });
        },
        Platform.OS === 'android' ? 150 : 100
      );
    }
  }, [messages]);
  const renderItem = ({ item }: any) => (
    <Box
      p="$4"
      mb="$2"
      backgroundColor="lightblue"
      borderRadius="$md"
      style={{
        padding: 10,
        backgroundColor: item.senderId === userId ? 'lightblue' : 'lightgrey',
        alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
        borderRadius: 10,
        margin: 5,
      }}
    >
      <Text>{item.text}</Text>
    </Box>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageContainer}
      />
      <HStack
        p="$4"
        backgroundColor="$white"
        borderTopColor="$grey"
        borderTopWidth={1}
        gap="$2"
      >
        <Input flexGrow={1}>
          <InputField
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
        </Input>
        <Button onPress={handleSend}>
          <FontAwesome name="send-o" size={24} color="black" />
        </Button>
      </HStack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});

export default Chat;
