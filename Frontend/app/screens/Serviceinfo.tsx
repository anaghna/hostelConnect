import { useRouter } from 'expo-router'; // Import the router for navigation
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

export default function HostelRegistrationForm() {
  const router = useRouter(); // Initialize the router

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Top Section with Semicircular Background */}
      <View style={styles.header}>
        <View style={styles.semicircle}>
          <Image 
            source={{ uri: 'https://i.im.ge/2025/02/12/HjvsfP.undraw-my-personal-files-886p-removebg-preview.png' }} // Update this URI
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>
        {/* Back Button at the Top */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        {/* Header Text */}
        <Text style={styles.headerText}>Fill out the details to register your hostel</Text>
      </View>

      {/* Form Section */}
      <Text style={styles.sectionTitle}>Food Service Info</Text>

      {/* Image Placeholder */}
      <TouchableOpacity style={styles.imagePlaceholderRight}>
        <Text style={styles.imagePlaceholderText}>+</Text>
      </TouchableOpacity>

      {/* Input Fields with Labels */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food Service Name</Text>
        <TextInput style={styles.input} placeholder="" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food Service Owner Name</Text>
        <TextInput style={styles.input} placeholder="" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} placeholder="" keyboardType="default" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Distance From College</Text>
        <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput style={styles.input} placeholder="" keyboardType="numeric" />
      </View>

      {/* Bottom Right Button (Next) */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomNextButton} onPress={() => router.push('/screens/Servicefoodinfo')}>
          <Text style={styles.bottomButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#E0B974',
  },
  header: {
    backgroundColor: '#E0B974',
    paddingBottom: 100,
    position: 'relative',
    overflow: 'visible',
  },
  semicircle: {
    width: 446,
    height: 350,
    backgroundColor: '#1C1C5E',
    position: 'absolute',
    top: -100,
    left: '50%',
    transform: [{ translateX: -200 }],
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 120,
    marginLeft: 20,
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    marginLeft: 20,
    color: '#FFF',
  },
  imagePlaceholderRight: {
    width: 100,
    height: 100,
    backgroundColor: '#D9BD8E',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    borderRadius: 10,
  },
  imagePlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#888',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#D9BD8E',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  bottomNextButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },
});
