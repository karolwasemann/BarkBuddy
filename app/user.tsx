import {
  Box,
  Button,
  ButtonText,
  View,
  Image,
  Text,
  Heading,
} from '@gluestack-ui/themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { UserProfile, addFriend, getUserData } from '../services/user';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../provider/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { StyleSheet } from 'react-native';
import theme from '../theme';
type ChatNavigationProp = StackNavigationProp<RootStackParamList, 'chat'>;

export default function UserDetails() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return null;
  }
  const navigation = useNavigation<ChatNavigationProp>();

  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      const userData = await getUserData(userId);
      setUser(userData);
    };
    fetchUser();
  }, [userId]);
  const handlePress = () => {
    const chatId = `${userId}-${currentUser?.uid}`.split('-').sort().join('-');
    navigation.navigate('chat', {
      conversationId: chatId,
      userId: currentUser.uid,
      buddyName: 'Buddy',
    });
  };
  return (
    <View style={styles.container}>
      {user?.photoURL ? (
        <Image
          style={{ width: '100%', height: 240 }}
          mb="$6"
          source={{
            uri: user?.photoURL || '',
          }}
          borderBottomRightRadius={5}
          borderBottomLeftRadius={5}
          alt="User Photo"
        />
      ) : (
        <Box
          style={{ width: '100%', height: 240 }}
          borderBottomRightRadius={5}
          borderBottomLeftRadius={5}
          justifyContent="center"
          alignItems="center"
        >
          <Heading>{user?.name}</Heading>
        </Box>
      )}
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
            borderColor={theme.colors.pri}
            gap="$2"
            alignItems="center"
            size="lg"
            onPress={handlePress}
          >
            <ButtonText
              size="md"
              color={theme.colors.text}
              $dark-color="$textDark400"
            >
              Chat
            </ButtonText>
            <Ionicons
              name="chatbubbles-outline"
              size={24}
              color={theme.colors.text}
            />
          </Button>
          <Button
            px="$4"
            py="$2"
            mr="$0"
            mb="$3"
            size="lg"
            gap="$2"
            onPress={async () =>
              await addFriend(currentUser?.uid, userId || '')
            }
            backgroundColor={theme.colors.accent}
          >
            <ButtonText>Add Buddy</ButtonText>
            <AntDesign name="adduser" size={24} color={theme.colors.white} />
          </Button>
        </Box>
      </Box>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
