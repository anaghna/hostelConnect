import { View, ScrollView } from 'react-native';
import React from 'react';
import CompareHostal from '../screens/Compare';

export default function Compare() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <CompareHostal />
      </View>
    </ScrollView>
  );
}
