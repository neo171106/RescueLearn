import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type LearnBoxComponent = {
  title: string;
  backgroundColor: string; // Korrigiert den Tippfehler
  redirectTo: string;
};

export default function LearnBoxComponent({
  title,
  backgroundColor,
  redirectTo,
}: LearnBoxComponent) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(redirectTo as never)}
      style={[styles.box, { backgroundColor }]} // Anwenden der Hintergrundfarbe als Style
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 10, // Vertikaler Padding für kleinere Höhe
    paddingHorizontal: 20, // Horizontaler Padding für Breite
    borderRadius: 8, // Abgerundete Ecken
    alignItems: 'center', // Zentrierung des Titels
    marginBottom: 16, // Abstand zu anderen Elementen
  } as ViewStyle,
  title: {
    fontSize: 16, // Kleinere Schriftgröße
    fontWeight: '500', // Mittlere Schriftstärke
    color: '#fff', // Weißer Text für besseren Kontrast
  },
});
