import { Text, SafeAreaView, ScrollView, Box } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { UserProfile, getAllUsersData } from '../../../db/user';
import { useAuth } from '../../../provider/AuthContext';
import UserCard from '../../../components/UserCard';

function Users() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers: UserProfile[] = await getAllUsersData();
        const users = allUsers.filter((user) => user?.uid !== currentUser?.uid);
        setUsers(allUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <ScrollView>
      <Box p="$2" flexDirection="row">
        {users.map((user, i) => (
          <UserCard user={user} key={`${user?.uid}-${i}`} />
        ))}
      </Box>
    </ScrollView>
  );
}
export default Users;
