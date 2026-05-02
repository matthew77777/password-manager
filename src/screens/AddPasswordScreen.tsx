import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { addPassword, updatePassword } from '../storage/storage';
import { PasswordItem } from '../types/password';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPassword'>;

export function AddPasswordScreen({ navigation, route }: Props) {
  const editItem = route.params?.item;
  const [serviceName, setServiceName] = useState(editItem?.serviceName ?? '');
  const [username, setUsername] = useState(editItem?.username ?? '');
  const [password, setPassword] = useState(editItem?.password ?? '');
  const [memo, setMemo] = useState(editItem?.memo ?? '');

  const onSave = async () => {
    if (!serviceName.trim() || !username.trim() || !password.trim()) {
      Alert.alert('必須項目を入力してください');
      return;
    }

    const now = new Date().toISOString();
    const item: PasswordItem = {
      id: editItem?.id ?? `${Date.now()}`,
      serviceName: serviceName.trim(),
      username: username.trim(),
      password,
      memo: memo.trim() || undefined,
      createdAt: editItem?.createdAt ?? now,
      updatedAt: now,
    };

    if (editItem) {
      await updatePassword(item);
    } else {
      await addPassword(item);
    }

    navigation.navigate('PasswordList');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Service Name</Text>
      <TextInput style={styles.input} value={serviceName} onChangeText={setServiceName} />

      <Text>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />

      <Text>Memo</Text>
      <TextInput
        style={[styles.input, styles.memo]}
        value={memo}
        onChangeText={setMemo}
        multiline
      />

      <Button title="保存" onPress={() => void onSave()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  memo: { minHeight: 100, textAlignVertical: 'top' },
});
