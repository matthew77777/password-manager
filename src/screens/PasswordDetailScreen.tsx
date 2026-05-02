import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { deletePassword } from '../storage/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordDetail'>;

export function PasswordDetailScreen({ route, navigation }: Props) {
  const { item } = route.params;
  const [showPassword, setShowPassword] = useState(false);

  const onDelete = async () => {
    await deletePassword(item.id);
    Alert.alert('削除しました');
    navigation.navigate('PasswordList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service</Text>
      <Text style={styles.value}>{item.serviceName}</Text>

      <Text style={styles.label}>Username</Text>
      <Text style={styles.value}>{item.username}</Text>

      <Text style={styles.label}>Password</Text>
      <Text style={styles.value}>{showPassword ? item.password : '••••••••'}</Text>
      <Button
        title={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
        onPress={() => setShowPassword((v) => !v)}
      />

      <Text style={styles.label}>Memo</Text>
      <Text style={styles.value}>{item.memo || '-'}</Text>

      <View style={styles.actions}>
        <Button title="編集" onPress={() => navigation.navigate('AddPassword', { item })} />
        <Button
          title="削除"
          color="#c0392b"
          onPress={() => {
            Alert.alert('確認', 'このデータを削除しますか？', [
              { text: 'キャンセル', style: 'cancel' },
              { text: '削除', style: 'destructive', onPress: () => void onDelete() },
            ]);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  label: { fontWeight: '700', marginTop: 8 },
  value: { fontSize: 16, marginBottom: 4 },
  actions: { marginTop: 16, gap: 8 },
});
