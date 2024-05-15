import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Text,
  FormControl,
  Image,
  Input,
  InputField,
  VStack,
  InputSlot,
  Button,
  ButtonText,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
  KeyboardAvoidingView,
  ScrollView,
} from '@gluestack-ui/themed';
import { auth } from '../firebaseConfig';
import theme from '../theme';
import Logo from '../assets/images/border.png';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const login = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Failed to log in');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
            <VStack>
              <FormControl>
                <VStack alignItems="center" gap="$4">
                  <Image
                    size="lg"
                    source={Logo}
                    backgroundColor={theme.colors.back}
                    alt="Bark Buddy Logo"
                  />
                  <VStack space="xs" width={350}>
                    <Text lineHeight="$xs">Email</Text>
                    <Input borderColor={theme.colors.accent}>
                      <InputField
                        type="text"
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                      />
                    </Input>
                  </VStack>
                  <VStack space="xs" width={350}>
                    <Text lineHeight="$xs">Password</Text>
                    <Input borderColor={theme.colors.accent}>
                      <InputField
                        type={showPassword ? 'text' : 'password'}
                        onChangeText={(text) => setPassword(text)}
                      />
                      <InputSlot pr="$3" onPress={handleState}>
                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                      </InputSlot>
                    </Input>
                  </VStack>
                  <Button
                    onPress={login}
                    alignItems="center"
                    isDisabled={isLoading}
                    backgroundColor={theme.colors.pri}
                  >
                    <ButtonText>Login</ButtonText>
                  </Button>
                </VStack>
              </FormControl>
            </VStack>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.back,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
