import { ScrollView, Box } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthContext';
import { UserProfile, getAllUsersData, getUserData } from '../../services/user';
import Friend from '../../components/Friend';
import { useIsFocused } from '@react-navigation/native';

function Friends() {
  const { currentUser } = useAuth();
  const isFocused = useIsFocused(); // Hook to check if the screen is focused

  const [friends, setFriends] = useState<UserProfile[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = await getUserData(currentUser?.uid || '');
        const friendIds = user?.friends || [];
        const friendsData = await Promise.all(
          friendIds.map((id) => getUserData(id))
        );
        setFriends(friendsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [isFocused, currentUser]);

  return (
    <ScrollView>
      <Box p="$4" gap="$5">
        {friends.map((user, i) => (
          <Friend user={user} key={`${user?.uid}-${i}`} />
        ))}
      </Box>
    </ScrollView>
  );
}
export default Friends;
