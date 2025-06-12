import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Importing router for navigation

export default function FirstPage() {
  const router = useRouter(); // Initializing the router

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who are you?</Text>

      {/* Student Button */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/screens/Usereg')} // Navigate to Student Registration
      >
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://i.im.ge/2025/02/10/H5ARPG.student.png' }} // Replace with actual URL or local image path
            style={styles.icon}
          />
          <Text style={styles.text}>I am a Student</Text>
        </View>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>

      {/* Hostel Owner Button */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/screens/Ownereg')} // Navigate to Hostel Owner Registration
      >
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://i.im.ge/2025/02/10/H5AHLz.ownership.png' }} // Replace with actual URL or local image path
            style={styles.icon}
          />
          <Text style={styles.text}>I am a Hostel Owner</Text>
        </View>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>

      {/* Service Provider Button */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/screens/Foodreg')} // Navigate to Food Service Registration
      >
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://i.im.ge/2025/02/10/H53CHc.courier.png' }} // Replace with actual URL or local image path

            style={styles.icon}
          />
          <Text style={styles.text}>I am a Service-provider</Text>
        </View>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4B678', // Matches the beige background
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
  },
  card: {
    backgroundColor: '#2E265D',
    padding: 39,
    marginVertical: 13,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 90,
    height: 80,
    marginRight: 1,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 20,
    color: '#fff',
  },
});