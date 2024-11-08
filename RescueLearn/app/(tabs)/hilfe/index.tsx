import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

export default function Hilfe() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<string[]>([]); // Liste der Krankenhäuser

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });

      // API-Aufruf für nahegelegene Krankenhäuser
      const fetchHospitals = async () => {
        if (coords.latitude && coords.longitude) {
          const radius = 5000; // 5km
          const apiKey = 'missing api'; // Dein API-Key hier

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=${radius}&type=hospital&key=${apiKey}`
            );
            const data = await response.json();

            if (data.results) {
              const hospitalList = data.results.map((result: any) => `${result.name}: ${result.vicinity}`);
              setHospitals(hospitalList);
            }
          } catch (error) {
            console.error('Error fetching hospitals:', error);
          }
        }
      };

      fetchHospitals();
    };

    getLocation();
  }, []);

  const generateGoogleMapsUrl = () => {
    if (location) {
      const { latitude, longitude } = location;
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyCPyyDH0JtDNVEs_hbKl97UAlRLYFoxGHE&q=hospitals&center=${latitude},${longitude}&zoom=15`;
    }
    return 'https://www.google.com/maps';
  };

  // HTML für die WebView mit eingebettetem iframe
  const generateHtml = () => {
    const mapUrl = generateGoogleMapsUrl();
    return `
      <html>
        <body style="margin:0;">
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            style="border:0" 
            src="${mapUrl}" 
            allowfullscreen>
          </iframe>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Your Current Location</Text>
        {location ? (
          <Text style={styles.locationText}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        ) : (
          <Text>Tracking location...</Text>
        )}

        <Text style={styles.title}>Nearby Hospitals</Text>
        {hospitals.length > 0 ? (
          hospitals.map((hospital, index) => (
            <Text key={index} style={styles.hospitalText}>
              {hospital}
            </Text>
          ))
        ) : (
          <Text>No nearby hospitals found</Text>
        )}

        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Text>{errorMsg}</Text>
          </View>
        ) : location ? (
          <WebView
            originWhitelist={['*']}
            source={{ html: generateHtml() }}
            style={styles.map}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Loading map...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  hospitalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300, // Verkleinerte Höhe der Google Maps Karte
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
