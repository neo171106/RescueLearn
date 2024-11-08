import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import BoxComponent from '@/components/BoxComponent'; // Importiere die neue Komponente
import Support_Feedback from '../../components/support_feedback';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Support_Feedback
        title="Support und Feedback"
        redirectTo="support_feedback/index"
      />

      {/* Boxen mit individuellem Text, Farbe, Bild und Untertitel */}
      <BoxComponent
        title="Lernen"
        subtitle="Schritt für Schritt" // Untertitel für Box Eins
        backgroundColor="#FF5733"
        imageUrl="https://example.com/image1.png"
        redirectTo="lernen/index" // Weiterleitung zu Tab Two
      />
      <BoxComponent
        title="Prüfung"
        subtitle="Prüfe das gelernte" // Untertitel für Box Zwei
        backgroundColor="#3357FF"
        imageUrl="https://example.com/image2.png"
        redirectTo="prüfung/index"
      />
      <BoxComponent
        title="Finde Hilfe"
        subtitle="Krankenhäuser in deiner Nähe" // Untertitel für Box Drei
        backgroundColor="#33FF57"
        imageUrl="https://example.com/image3.png"
        redirectTo="hilfe/index"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16, // Padding für etwas Platz an den Rändern
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
