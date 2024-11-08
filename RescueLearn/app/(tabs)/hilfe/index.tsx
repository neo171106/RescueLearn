import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function hilfe() {
  return <Text style={styles.title}>Hilfe</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
