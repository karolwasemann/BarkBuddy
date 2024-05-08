import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H1, H5, YStack, Button } from 'tamagui';
import { StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <YStack alignItems="center" gap="$4">
        <H1 color="dark">Bark Buddy</H1>
        <H5 color="dark">Find a Buddy and bark together</H5>
        <Button
          size="$5"
          width={200}
          backgroundColor={'$purple9Light'}
          onPress={() => router.push('/login')}
          style={{ marginTop: 40 }}
        >
          Login
        </Button>
        <Link href={'/signup'}>Create Account</Link>
      </YStack>
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
