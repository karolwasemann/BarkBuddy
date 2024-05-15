import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Button, GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { AuthProvider, useAuth } from '../provider/AuthContext';
import Page from './Home';
import Signup from './signup';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import UserDetails from './user';
import Tabs from './(tabs)/_layout';
import Chat from './chat';
import { ThemeProvider } from 'styled-components/native';
import theme from '../theme';
import Home from './Home';
import LoginScreen from './login';

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
    <ThemeProvider theme={theme}>
      <GluestackUIProvider config={config}>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
export type RootStackParamList = {
  user: { userId: string };
  chat: { conversationId: string; userId: string; buddyName: string };
  chats: undefined;
  Home: undefined;
  login: undefined;
  signup: undefined;
  '(tabs)': undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

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
              title: 'Bark Buddy',
              headerStyle: {
                backgroundColor: theme.colors.back,
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="user"
            component={UserDetails}
            options={{
              title: 'Your Buddy',
              headerStyle: {
                backgroundColor: theme.colors.back,
              },
            }}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={({ route }) => ({
              title: route.params.buddyName,
              headerStyle: {
                backgroundColor: theme.colors.back,
              },
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                title: 'Login',
                headerStyle: {
                  backgroundColor: theme.colors.back,
                },
              }}
            />
            <Stack.Screen
              name="signup"
              component={Signup}
              options={{
                title: 'Creat Account',
                headerStyle: {
                  backgroundColor: theme.colors.back,
                },
              }}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
