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
  setEmail: (text: string) => void;
};
const InputEmail = ({ user, setEmail }: InputeNameProps) => {
  return (
    <>
      <Input>
        <InputField
          placeholder="Email"
          defaultValue={user?.email || ''}
          onChangeText={(text) => setEmail(text)}
        />
      </Input>
    </>
  );
};

export default InputEmail;
