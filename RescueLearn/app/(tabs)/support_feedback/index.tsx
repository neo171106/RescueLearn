import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, phone, email, subject, message } = formData;

    // Überprüfe, ob eines der Felder leer ist
    if (!firstName || !lastName || !phone || !email || !subject || !message) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle Felder aus.');
      return false;
    }

    // E-Mail-Validierung
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Fehler', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return false;
    }

    // Telefonnummern-Validierung
    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert(
        'Fehler',
        'Bitte geben Sie eine gültige Telefonnummer (nur Zahlen) ein.'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    console.log('Formular wird gesendet'); // Debugging-Zeile, um sicherzustellen, dass diese Funktion aufgerufen wird
    if (validateForm()) {
      Alert.alert('Erfolg', 'Formular erfolgreich gesendet!');
    } else {
      console.log('Formular ist ungültig'); // Debugging-Zeile, um zu sehen, warum das Formular nicht gesendet wird
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Vorname</Text>
          <TextInput
            style={styles.input}
            placeholder="Vorname"
            value={formData.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nachname</Text>
          <TextInput
            style={styles.input}
            placeholder="Nachname"
            value={formData.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefonnummer</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefonnummer"
            value={formData.phone}
            onChangeText={(text) =>
              handleInputChange('phone', text.replace(/[^0-9]/g, ''))
            } // Entfernen von Nicht-Ziffern
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Betreff</Text>
          <TextInput
            style={styles.input}
            placeholder="Betreff"
            value={formData.subject}
            onChangeText={(text) => handleInputChange('subject', text)}
          />
        </View>
      </View>

      <View style={styles.textAreaContainer}>
        <Text style={styles.label}>Nachricht</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ihre Nachricht"
          value={formData.message}
          onChangeText={(text) => handleInputChange('message', text)}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Senden</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  textAreaContainer: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
