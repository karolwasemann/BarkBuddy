import React from 'react';
import { SafeAreaView } from 'react-native';
import { VStack } from '@gluestack-ui/themed';
import { useAuth } from '../provider/AuthContext';
import UserPhoto from '../components/UserPhoto';

const Profile: React.FC = () => {
  return (
    <SafeAreaView>
      <VStack alignItems="center" mt="$10">
        <UserPhoto />
      </VStack>
    </SafeAreaView>
  );
};

export default Profile;
