import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Axios from '../Axios/Axios'
export default function Owneregister() {
  const router = useRouter();
  const imageUri = "https://i.im.ge/2025/02/10/H5AHLz.ownership.png";

  // State for form inputs
  const [hostelName, setHostelName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rate, setRate] = useState("");
  const [distance, setDistance] = useState("");
  const [rooms, setRooms] = useState("");

  // Function to handle registration
  const handleRegister = async () => {
    if (!hostelName || !email || !username || !mobile || !password || !rate || !distance || !rooms) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const payload = {
      name: username,
      email,
      HostalName: hostelName,
      mobile,
      password,
      rate,
      distance,
      rooms,
    };

    try {
      const response = await Axios.post("/addalhostel", {
        payload,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        Alert.alert("Success", "Registration Successful!");
        router.push("/screens/Ownersignin"); // Navigate to sign-in
      } else {
        Alert.alert("Error", data.error || "Registration failed!");
      }
    } catch (error) {
      Alert.alert("Network Error", "Failed to connect to server!");
      console.error("API Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100} // Adjust offset to prevent button hiding
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.circle}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Hostel Name" placeholderTextColor="#1C1C5E" value={hostelName} onChangeText={setHostelName} />
          <TextInput style={styles.input} placeholder="Email ID" placeholderTextColor="#1C1C5E" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#1C1C5E" value={username} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder="Rate (in INR)" placeholderTextColor="#1C1C5E" value={rate} onChangeText={setRate} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Distance (in km)" placeholderTextColor="#1C1C5E" value={distance} onChangeText={setDistance} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Number of Rooms" placeholderTextColor="#1C1C5E" value={rooms} onChangeText={setRooms} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Mobile Number" placeholderTextColor="#1C1C5E" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#1C1C5E" value={password} onChangeText={setPassword} secureTextEntry />
          
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          {/* Fixed Sign-up navigation text */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.signUpText} onPress={() => router.push("/screens/Ownersignin")}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C5E" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 120, // Ensures space at the bottom
  },
  circle: {
    width: 300,
    height: 300,
    backgroundColor: '#E0B974',
    borderRadius: 200,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  image: { 
    width: "80%", 
    height: "80%", 
    resizeMode: "contain" 
  },
  form: { width: "100%", paddingHorizontal: 20 },
  input: { 
    backgroundColor: '#D9D9D9',
    color: '#fff',
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
    backgroundColor: "#E0B974", 
    borderRadius: 35, 
    paddingVertical: 12, 
    alignItems: "center", 
    marginTop: 20,
    height:50,
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  registerButtonText: { color: "#1C1C5E", fontSize: 19, fontWeight: "bold" },
  footer: { marginTop: 15, alignItems: "center" },
  footerText: { color: "#fff", fontSize: 14 },
  signUpText: { color: "#E0B974", fontWeight: "bold" },
});

export default Owneregister;
