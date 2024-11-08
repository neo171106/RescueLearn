import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LearnBoxComponent from '../../../components/LearnBoxComponent';

export default function lernen() {
  return (
    <View>
      <Text style={styles.title}>Lernen</Text>
      <LearnBoxComponent
        title="Test"
        redirectTo="grundlagen_erste_hilfe/index"
        backgroundColor="black"
      />
      <LearnBoxComponent
        title="Test"
        redirectTo="grundlagen_erste_hilfe"
        backgroundColor="black"
      />
      <LearnBoxComponent
        title="Test"
        redirectTo="grundlagen_erste_hilfe"
        backgroundColor="black"
      />
      <LearnBoxComponent
        title="Test"
        redirectTo="grundlagen_erste_hilfe"
        backgroundColor="black"
      />
      <LearnBoxComponent
        title="Test"
        redirectTo="grundlagen_erste_hilfe"
        backgroundColor="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
