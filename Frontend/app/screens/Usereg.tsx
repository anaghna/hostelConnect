import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Owneregister() {
  const router = useRouter();
  const imageUri = 'https://i.im.ge/2025/02/10/H5ARPG.student.png'; 

  // State for form inputs
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle Register button press
  const handleRegister = async () => {
    // console.log("user resistartion")
    console.log(email, username, password)
    if (!email || !username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
    console.log("user registartion")

      const response = await fetch('http://172.16.5.232:3000/Userreg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      let data = await response.text(); // Get the response as plain text first
      console.log(data)
      // Try to parse the response as JSON
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.log(e)
        // If parsing fails, treat it as a plain string message
        data = { message: data };
      }

      if (response.ok) {
        Alert.alert('Success', data.message || 'You have successfully registered!');
        router.push('/screens/Usersignin'); // Navigate to the login screen
      } else {
        Alert.alert('Error', data.message || 'Registration failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Circle with Image */}
      <View style={styles.circle}>
        <Image source={{ uri: imageUri }} style={styles.circleImage} />
      </View>

      {/* Form for hostel registration */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor="#1C1C5E"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#1C1C5E"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#1C1C5E"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      Already have an account?{" "}
                      <Text style={styles.signUpText} onPress={() => router.push("/screens/Usersignin")}>
                        Sign In
                      </Text>
                    </Text>
                  </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C5E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 300,
    height: 300,
    backgroundColor: '#E0B974',
    borderRadius: 200,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensures the image fits within the circle
  },
  circleImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover', // Ensures the image covers the circle
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#D9D9D9',
    color: '#1C1C5E',
    borderRadius: 1,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
    height: 50,
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  registerButton: {
    backgroundColor: '#E0B974',
    borderRadius: 35,
    paddingVertical: 12,
    alignItems: 'center',
    width: "100%",
    height: 50,
    marginTop: 20,
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  registerButtonText: {
    color: '#1C1C5E',
    fontSize: 19,
    fontWeight: 'bold',
  },
  footer: { marginTop: 15, alignItems: "center" },
  footerText: { color: "#fff", fontSize: 14 },
  signUpText: { color: "#E0B974", fontWeight: "bold" },
});
