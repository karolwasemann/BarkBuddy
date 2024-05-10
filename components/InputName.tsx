import { View, Text } from 'react-native';
import React from 'react';
import {
  FormControlHelper,
  FormControlHelperText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
type InputeNameProps = {
  userName: string;
  setDisplayName: (text: string) => void;
};
const InputName = ({ userName, setDisplayName }: InputeNameProps) => {
  return (
    <>
      <Input>
        <InputField
          placeholder="Your funny nickname"
          defaultValue={userName}
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
