import { View, Text } from 'react-native';
import React from 'react';
import {
  FormControlHelper,
  FormControlHelperText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import { User } from 'firebase/auth';
type InputeNameProps = {
  user: User | null;
  setDisplayName: (text: string) => void;
};
const InputName = ({ user, setDisplayName }: InputeNameProps) => {
  return (
    <>
      <Input>
        <InputField
          placeholder="Your funny nickname"
          defaultValue={user?.displayName || ''}
          onChangeText={(text) => setDisplayName(text)}
        />
      </Input>
      <FormControlHelper alignSelf="flex-start">
        <FormControlHelperText>
          What would you like people to call you?
        </FormControlHelperText>
      </FormControlHelper>
    </>
  );
};

export default InputName;
