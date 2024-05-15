import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Heading, Text, Button, ButtonText, Image } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import theme from '../theme';
import Logo from '../assets/images/border.png';
export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          mt="$12"
          size="2xl"
          source={Logo}
          backgroundColor={theme.colors.back}
          alt="Bark Buddy Logo"
        />
        <Heading color={theme.colors.pri} alignSelf="center" pb="$2" size="2xl">
          Bark Buddy
        </Heading>
        <Text color={theme.colors.text} alignSelf="center" size="xl">
          Find a buddy and bark together!
        </Text>
        <Button
          onPress={() => {
            router.push('/login');
          }}
          size="md"
          variant="solid"
          action="primary"
          backgroundColor={theme.colors.pri}
          mt="$8"
        >
          <ButtonText>Login</ButtonText>
        </Button>
        <Button
          onPress={() => router.push('/signup')}
          size="md"
          variant="link"
          action="primary"
          mt="$4"
        >
          <ButtonText color={theme.colors.accent}>Create Account</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.back,
  },
});
