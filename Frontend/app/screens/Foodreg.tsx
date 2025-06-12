import React, { useState } from "react";
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Axios from '../Axios/Axios'
export default function RegisterScreen() {
  const [serviceName, setServiceName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!serviceName || !phone || !email || !city || !distance || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await Axios.post("/registerfoodservices",{
          name: serviceName,
          phoneno: phone,
          emailid: email,
          city: city,
          distance: distance,
          password: password,
        });

      const data = response.data;
      console.log("API Response:", data);

      if (data.error) {
        Alert.alert("Registration Failed", data.error);
      } else {
        Alert.alert("Success", "Registered successfully!");
        router.push("/screens/Servicesignin");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <Image 
            source={{ uri: 'https://i.im.ge/2025/02/10/H53CHc.courier.png' }} 
            style={styles.circleImage}
            resizeMode="cover"
          />
        </View>

        <TextInput 
          style={styles.input} 
          placeholder="Service owner Name" 
          placeholderTextColor="#1C1C5E"
          value={serviceName}
          onChangeText={setServiceName}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Mobile Number" 
          placeholderTextColor="#1C1C5E"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput 
          style={styles.input} 
          placeholder="E-mail ID" 
          placeholderTextColor="#1C1C5E"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput 
          style={styles.input} 
          placeholder="City" 
          placeholderTextColor="#1C1C5E"
          value={city}
          onChangeText={setCity}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Distance From College"
          keyboardType="numeric" 
          placeholderTextColor="#1C1C5E"
          value={distance}
          onChangeText={setDistance}
        />

        {/* Password Field with Proper Spacing */}
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput} 
            placeholder="Password" 
            placeholderTextColor="#1C1C5E" 
            secureTextEntry={!passwordVisible} 
            value={password}
            onChangeText={setPassword}
          />
          {/* <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text style={styles.eyeIcon}>{passwordVisible ? "👁" : "🙈"}</Text>
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister} 
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#1C1C5E" /> : <Text style={styles.registerText}>Register</Text>}
        </TouchableOpacity>

        {/* Already have an account? */}
        <TouchableOpacity onPress={() => router.push("/screens/Servicesignin")}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    backgroundColor: "#1C1C5E",
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  circleContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#E0B974',
    borderRadius: 200,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circleImage: {
    width: "80%",
    height: "80%",
    borderRadius: 200,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 1,
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C5E",
  },
  eyeIcon: {
    fontSize: 18,
    color: "#1C1C5E",
    paddingHorizontal: 8,
  },
  registerButton: {
    backgroundColor: "#D9B378",
    borderRadius: 35,
    padding: 15,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  registerText: {
    fontSize: 18,
    color: "#1C1C5E",
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 15,
  },
  loginLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#D9B378",
  },
});

