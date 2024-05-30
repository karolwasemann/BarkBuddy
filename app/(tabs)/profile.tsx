import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';

import {
  Button,
  ButtonText,
  CircleIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Textarea,
  TextareaInput,
  Toast,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import UserPhoto from '../../components/UserPhoto';
import InputName from '../../components/InputName';
import { useAuth } from '../../provider/AuthContext';
import SelectBreed from '../../components/SelectBreed';
import { getUserData, updateUserData, UserProfile } from '../../services/user';
import theme from '../../theme';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    Alert.alert('You need to be logged in to view this page');
    return null;
  }

  const toast = useToast();

  const [userProfile, setUserProfile] = useState<UserProfile>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(currentUser.uid);
      console.log('🚀 ~ fetchData ~ data:', data);
      setUserProfile(data);
    };

    fetchData();
  }, [currentUser]);

  const submitHandle = async () => {
    const user: UserProfile = {
      name: currentUser.displayName || '',
      email: currentUser.email,
      uid: currentUser.uid,
      friends: [],
      photoURL: currentUser.photoURL,
      ...userProfile,
    };
    await updateUserData(currentUser.uid, user);
    toast.show({
      placement: 'top',

      render: () => (
        <Toast action="success">
          <ToastTitle>Profile updated</ToastTitle>
        </Toast>
      ),
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FormControl>
        <VStack alignItems="center" p="$3" gap="$4">
          <UserPhoto user={currentUser} />
          <VStack alignItems="center">
            <InputName
              userName={userProfile?.name || ''}
              setDisplayName={(text: string) =>
                setUserProfile({ ...userProfile, name: text })
              }
            />
          </VStack>

          <Input borderColor={theme.colors.accent}>
            <InputField
              placeholder="City"
              defaultValue={userProfile?.city || ''}
              onChangeText={(text) =>
                setUserProfile({ ...userProfile, city: text })
              }
            />
          </Input>
          <Textarea size="md" w="$full" borderColor={theme.colors.accent}>
            <TextareaInput
              placeholder="Write something about yourself and your dog"
              defaultValue={userProfile?.desc || ''}
              onChangeText={(text) =>
                setUserProfile({ ...userProfile, desc: text })
              }
            />
          </Textarea>
          <HStack gap="$6" alignItems="flex-start" mt="$2" mb="$2">
            <FormControlLabel>
              <FormControlLabelText>Dog's gender</FormControlLabelText>
            </FormControlLabel>
            <RadioGroup
              value={userProfile?.gender || ''}
              onChange={(gender) =>
                setUserProfile({ ...userProfile, gender: gender })
              }
            >
              <HStack space="2xl">
                <Radio value="female">
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Female</RadioLabel>
                </Radio>
                <Radio value="male ">
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Male</RadioLabel>
                </Radio>
              </HStack>
            </RadioGroup>
          </HStack>
          <SelectBreed
            defaultValue={userProfile?.breed || ''}
            onSelectBreed={(e) => setUserProfile({ ...userProfile, breed: e })}
          />
          <Input borderColor={theme.colors.accent}>
            <InputField
              placeholder="Dog's name"
              defaultValue={userProfile?.dogName || ''}
              onChangeText={(text) =>
                setUserProfile({ ...userProfile, dogName: text })
              }
            />
          </Input>
          <Button
            size="md"
            variant="solid"
            w="$full"
            onPress={submitHandle}
            backgroundColor={theme.colors.accent}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
});
export default Profile;
