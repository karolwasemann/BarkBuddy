import { Text, SafeAreaView } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { UserProfile, getAllUsersData } from '../db/user';

function Users() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsersData();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <SafeAreaView>
      <Text>Users</Text>
      {users.map((user, i) => (
        <Text key={`${user?.name}-${i}`}>{user?.name}</Text>
      ))}
    </SafeAreaView>
  );
}

export default Users;
