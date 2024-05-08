import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET_AUTH } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function TabOneScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>(
    'off'
  );

  const login = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(GET_AUTH, email, password);
      alert('Logged in');
    } catch (error) {
      alert('Failed to log in');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(GET_AUTH, email, password);
      alert('Signed up');
    } catch (error) {
      alert('Failed to sign up');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);
  return (
    <SafeAreaView style={styles.container}>
      {/* <YStack gap="$3" width={350} alignContent="center" alignItems="stretch">
        <Form
          alignItems="center"
          gap="$2"
          onSubmit={() => setStatus('submitting')}
        >
          <Input
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            backgroundColor={'$purple2Light'}
            color={'black'}
          />
          <Input
            value={password}
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            backgroundColor={'$purple2Light'}
            color={'black'}
          />

          <Form.Trigger asChild disabled={status !== 'off'}>
            <Button
              size="$5"
              width={200}
              onPress={login}
              disabled={isLoading}
              backgroundColor={'$purple9Light'}
              icon={status === 'submitting' ? () => <Spinner /> : undefined}
            >
              Login
            </Button>
          </Form.Trigger>
          <Form.Trigger asChild disabled={status !== 'off'}>
            <Button
              size="$5"
              width={200}
              onPress={signup}
              disabled={isLoading}
              backgroundColor={'$purple9Light'}
            >
              Creat Account
            </Button>
          </Form.Trigger>
        </Form>
      </YStack> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
