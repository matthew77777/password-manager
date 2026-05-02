import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LockScreen } from './src/screens/LockScreen';
import { PasswordListScreen } from './src/screens/PasswordListScreen';
import { AddPasswordScreen } from './src/screens/AddPasswordScreen';
import { PasswordDetailScreen } from './src/screens/PasswordDetailScreen';
import { PasswordItem } from './src/types/password';

export type RootStackParamList = {
  Lock: undefined;
  PasswordList: undefined;
  AddPassword: { item?: PasswordItem } | undefined;
  PasswordDetail: { item: PasswordItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Lock">
          <Stack.Screen name="Lock" component={LockScreen} options={{ title: 'Lock' }} />
          <Stack.Screen
            name="PasswordList"
            component={PasswordListScreen}
            options={{ title: 'Passwords' }}
          />
          <Stack.Screen
            name="AddPassword"
            component={AddPasswordScreen}
            options={{ title: 'Add / Edit Password' }}
          />
          <Stack.Screen
            name="PasswordDetail"
            component={PasswordDetailScreen}
            options={{ title: 'Password Detail' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
