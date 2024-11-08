import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function prüfung() {
  return <Text style={styles.title}>prüfung</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
