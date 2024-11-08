import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

export default function Hilfe() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      if (typeof navigator.geolocation !== 'undefined') {
        // Für Web
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setErrorMsg(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          }
        );
      } else {
        // Für mobile Geräte (mit expo-location)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
          }
        );

        return () => subscription.remove();
      }
    };

    getLocation();
  }, []);

  const generateGoogleMapsUrl = () => {
    if (location) {
      const { latitude, longitude } = location;
      return `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},15z`;
    }
    return 'https://www.google.com/maps';
  };

  return (
    <View style={styles.container}>
      <Text>hello</Text>
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Text>{errorMsg}</Text>
        </View>
      ) : location ? (
        <WebView source={{ uri: generateGoogleMapsUrl() }} style={styles.map} />
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Tracking location...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
