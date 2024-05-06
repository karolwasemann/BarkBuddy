import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET_AUTH } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from 'expo-router';

export default function TabOneScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Log In" onPress={login} disabled={isLoading} />
      <Button title="Craete Account" onPress={signup} disabled={isLoading} />
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
