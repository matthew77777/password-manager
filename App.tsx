import React from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Password Manager Test</Text>
      <Button title="テスト" onPress={() => {}} />
    </View>
  );
}
