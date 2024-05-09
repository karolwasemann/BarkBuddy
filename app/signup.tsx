import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  Text,
  FormControl,
  Heading,
  Input,
  InputField,
  VStack,
  InputSlot,
  Button,
  ButtonText,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
} from '@gluestack-ui/themed';
import { auth } from '../firebaseConfig';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const signup = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signed up');
    } catch (error) {
      alert('Failed to sign up');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <VStack padding={5} marginTop={60}>
        <FormControl>
          <VStack space="xl" alignItems="center">
            <Heading lineHeight="$md">Create Account</Heading>
            <VStack space="xs" width={350}>
              <Text lineHeight="$xs">Email</Text>
              <Input>
                <InputField
                  type="text"
                  onChangeText={(text) => setEmail(text)}
                  autoCapitalize="none"
                />
              </Input>
            </VStack>
            <VStack space="xs" width={350}>
              <Text lineHeight="$xs">Password</Text>
              <Input>
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  onChangeText={(text) => setPassword(text)}
                />
                <InputSlot pr="$3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>
            <Button onPress={signup} alignItems="center" isDisabled={isLoading}>
              <ButtonText>Signup</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </VStack>
    </SafeAreaView>
  );
}
