import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CalendarDaysIcon,
  ChevronsLeftIcon,
  GluestackUIProvider,
  Icon,
} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { AuthProvider, useAuth } from '../provider/AuthContext';
import Page from './page';
import Signup from './signup';
import Login from './login';
import Profile from './profile';
import Tabs from './(tabs)/_layout';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </GluestackUIProvider>
  );
}

const Stack = createNativeStackNavigator();

function RootLayoutNav() {
  const { currentUser, logout } = useAuth();

  return (
    <Stack.Navigator>
      {currentUser ? (
        <>
          <Stack.Screen
            name="(tabs)"
            component={Tabs}
            options={{
              // headerShown: false,
              headerRight: () => (
                <Button
                  size="md"
                  variant="link"
                  action="primary"
                  gap="$1"
                  justifyContent="center"
                  onPress={logout}
                >
                  <ButtonIcon as={ChevronsLeftIcon} />
                  <ButtonText>logout</ButtonText>
                </Button>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="page" component={Page} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
