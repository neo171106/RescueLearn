// BoxComponent.tsx
import React from 'react';
import { Pressable, StyleSheet, Image, View } from 'react-native';
import { Text } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';

type BoxProps = {
  title: string;
  subtitle: string;
  backgroundColor: string;
  imageUrl: string;
  redirectTo: string;
};

export default function BoxComponent({
  title,
  subtitle,
  backgroundColor,
  imageUrl,
  redirectTo,
}: BoxProps) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(redirectTo as never)}
      style={[styles.box, { backgroundColor }]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row', // Layout der Box als Zeile
    alignItems: 'center', // Vertikale Zentrierung
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Abstand zwischen Text und Bild
    width: '100%',
  },
  textContainer: {
    flex: 1, // Flexibles Layout für den Textcontainer
    justifyContent: 'center',
  },
  image: {
    width: 80, // Angepasste Bildbreite
    height: 80, // Angepasste Bildhöhe
    resizeMode: 'cover', // Bildabdeckungsmodus
    marginLeft: 10, // Abstand vom Text zum Bild
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left', // Text linksbündig
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left', // Text linksbündig
  },
});
