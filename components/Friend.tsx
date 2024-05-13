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
} from '@gluestack-ui/themed';
import { UserProfile } from '../services/user';
type FriendProps = {
  user: UserProfile;
};
export default function Friend({ user }: FriendProps) {
  return (
    <>
      <Box flexDirection="row">
        <Avatar size="lg" mr="$3">
          <AvatarFallbackText fontFamily="$heading">RR</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: user?.photoURL || '',
            }}
            //   borderRadius="$xl"
          />
        </Avatar>
        <VStack>
          <Heading size="md" mb="$1" bold>
            {user?.name}
          </Heading>
          <Heading size="sm">{user?.city}</Heading>
        </VStack>
      </Box>
      <Divider mt="$0.5" mb="$1.5" />
    </>
  );
}
