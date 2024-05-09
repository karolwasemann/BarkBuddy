import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Heading, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Heading>Bark Buddy</Heading>
        <Text>Find a Buddy and bark together</Text>
        <Button
          onPress={() => {
            router.push('/login');
          }}
          style={{ marginTop: 40 }}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText>Login</ButtonText>
        </Button>
        <Button
          onPress={() => router.push('/signup')}
          size="md"
          variant="link"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText>Create Account</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 180,
  },
});
