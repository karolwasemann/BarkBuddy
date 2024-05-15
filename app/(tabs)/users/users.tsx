import { ScrollView, Box } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../provider/AuthContext';
import UserCard from '../../../components/UserCard';
import { UserProfile, getAllUsersData } from '../../../services/user';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import theme from '../../../theme';

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Box p="$2" flexDirection="row" flexWrap="wrap">
          {users.map((user, i) => (
            <UserCard user={user} key={`${user?.uid}-${i}`} />
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
});
export default Users;
