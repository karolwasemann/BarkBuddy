import { ScrollView, Box } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../provider/AuthContext';
import UserCard from '../../../components/UserCard';
import { UserProfile, getAllUsersData } from '../../../services/user';

function Users() {
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
      <Box p="$2" flexDirection="row" flexWrap="wrap">
        {users.map((user, i) => (
          <UserCard user={user} key={`${user?.uid}-${i}`} />
        ))}
      </Box>
    </ScrollView>
  );
}
export default Users;
