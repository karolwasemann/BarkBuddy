import { ScrollView, Box } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthContext';
import { UserProfile, getAllUsersData } from '../../services/user';
import Friend from '../../components/Friend';

function Friends() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers: UserProfile[] = await getAllUsersData();
        const users = allUsers.filter((user) => user?.uid !== currentUser?.uid);
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ScrollView>
      <Box p="$4" gap="$5">
        {users.map((user, i) => (
          <Friend user={user} key={`${user?.uid}-${i}`} />
        ))}
      </Box>
    </ScrollView>
  );
}
export default Friends;
