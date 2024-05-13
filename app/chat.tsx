import React, { useState, useEffect } from 'react';
import { TextInput, Button, FlatList, Text, View } from 'react-native';
import { readMessages, sendMessage } from '../services/chats';
import { useLocalSearchParams } from 'expo-router';

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

  return (
    <View>
      <Text>Chat with {conversationId}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor:
                item.senderId === userId ? 'lightblue' : 'lightgrey',
              alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
              borderRadius: 10,
              margin: 5,
            }}
          >
            <Text>{item.text}</Text>
            <Text style={{ fontSize: 10 }}>
              {item.timestamp.toLocaleString()}
            </Text>
          </View>
        )}
      />
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message..."
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 10 }}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default Chat;
