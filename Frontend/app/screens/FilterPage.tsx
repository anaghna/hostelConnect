import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

export default function FilterPage() {
  // Sample hostel data (Replace this with API data)
  const hostels = [
    { id: 1, name: "Hostel A", location: "City Center" },
    { id: 2, name: "Hostel B", location: "Near University" },
    { id: 3, name: "Hostel C", location: "Suburbs" }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Page</Text>
      <ScrollView>
        {hostels.map((hostel) => (
          <View key={hostel.id} style={styles.hostelContainer}>
            <Text style={styles.hostelName}>{hostel.name}</Text>
            <Text style={styles.hostelLocation}>{hostel.location}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C5E',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  hostelContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  hostelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C5E',
  },
  hostelLocation: {
    fontSize: 14,
    color: '#666',
  },
});
