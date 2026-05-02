import React, { useCallback, useState } from 'react';
import { View, Text, Button, FlatList, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { PasswordItem } from '../types/password';
import { getPasswords } from '../storage/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordList'>;

export function PasswordListScreen({ navigation }: Props) {
  const [items, setItems] = useState<PasswordItem[]>([]);

  const load = useCallback(async () => {
    const data = await getPasswords();
    setItems(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  return (
    <View style={styles.container}>
      <Button title="＋ 追加" onPress={() => navigation.navigate('AddPassword')} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>まだ登録がありません。</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate('PasswordDetail', { item })}
          >
            <Text style={styles.service}>{item.serviceName}</Text>
            <Text style={styles.user}>{item.username}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  empty: { marginTop: 24, textAlign: 'center', color: '#666' },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  service: { fontSize: 16, fontWeight: '700' },
  user: { fontSize: 14, color: '#666' },
});
