import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text } from 'react-native';

type Support_FeedbackProps = {
  title: string;
  redirectTo: string;
};

export default function Support_Feedback({
  title,
  redirectTo,
}: Support_FeedbackProps) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(redirectTo as never)}
      style={styles.box}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#A9A9A9', // Graue Hintergrundfarbe
    paddingVertical: 10, // Vertikaler Padding für kleinere Höhe
    paddingHorizontal: 20, // Horizontaler Padding für Breite
    borderRadius: 8, // Abgerundete Ecken
    alignItems: 'center', // Zentrierung des Titels
    marginBottom: 16, // Abstand zu anderen Elementen
  },
  title: {
    fontSize: 16, // Kleinere Schriftgröße
    fontWeight: '500', // Mittlere Schriftstärke
    color: '#fff', // Weißer Text für besseren Kontrast
  },
});
