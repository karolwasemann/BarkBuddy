import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CircleIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import UserPhoto from '../components/UserPhoto';
import InputName from '../components/InputName';
import { useAuth } from '../provider/AuthContext';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import SelectBreed from '../components/SelectBreed';
import { getUserData, updateUserData, UserProfile } from '../db/user';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    Alert.alert('You need to be logged in to view this page');
    return null;
  }
  const [userProfile, setUserProfile] = useState<UserProfile>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(currentUser.uid);
      setUserProfile(data);
    };

    fetchData();
  }, [currentUser]);

  const submitHandle = async () => {
    const user = {
      name: currentUser.displayName || '',
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      ...userProfile,
    };
    await updateUserData(currentUser.uid, user);
  };

  return (
    <SafeAreaView>
      <FormControl>
        <VStack alignItems="center" p="$6" gap="$4">
          <UserPhoto user={currentUser} />
          <VStack alignItems="center">
            <InputName
              userName={userProfile?.name || ''}
              setDisplayName={(text: string) =>
                setUserProfile({ ...userProfile, name: text })
              }
            />
          </VStack>
          <HStack mt="$2" gap="$8">
            <FormControlLabel>
              <FormControlLabelText>Birthday</FormControlLabelText>
            </FormControlLabel>
            <RNDateTimePicker
              value={userProfile?.birthday || new Date()}
              onChange={(e) => {
                const date = new Date(e.nativeEvent.timestamp);
                setUserProfile({
                  ...userProfile,
                  birthday: date,
                });
              }}
            />
          </HStack>
          <Input>
            <InputField
              placeholder="City"
              defaultValue={userProfile?.city || ''}
              onChangeText={(text) =>
                setUserProfile({ ...userProfile, city: text })
              }
            />
          </Input>
          <Textarea size="md" w="$full">
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
          <Button
            size="md"
            variant="solid"
            action="secondary"
            w="$full"
            onPress={submitHandle}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
};

export default Profile;
