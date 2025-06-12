import { useRouter } from 'expo-router'; 
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../Axios/Axios'

const API_URL = "/addfood"; // Replace with actual API URL

const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function HostelRegistrationForm() {
  const router = useRouter(); 
  const [messid, setMessid] = useState(null);
  const [formData, setFormData] = useState({
    FoodType: "",
    availability: "",
    Rate: "",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
  });

  // Retrieve messid from AsyncStorage when component mounts
  useEffect(() => {
    const getMessId = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        console.log(storedUserData,"storedUserData")
        if (storedUserData) {
          let data = JSON.parse(storedUserData);
          console.log("Retrieved userData:", data.user._id);
  
          // Ensure that _id is correctly accessed
          if (data && data.user._id) {  
            setMessid(data.user._id);
          } else {
            console.warn("Mess ID (_id) not found in stored user data");
          }
        }
      } catch (error) {
        console.error("Error fetching messid:", error);
      }
    };
  
    getMessId();
  }, []);
  

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {

    console.log("Submitting form data:", formData,messid);
    const response = await Axios.post(API_URL, 
       
      { ...formData, messid }, // Include messid in request
    );
    if (!messid) {
      Alert.alert("Error", "Mess ID not found. Please log in again.");
      return;
    }

    try {
      const response = await Axios.post(API_URL, 
       
        { ...formData, messid }, // Include messid in request
      );

      const data = await response.data;
      console.log("API Response:", data)
      if (response.data.ok) {
        Alert.alert("Success", "Food service details submitted successfully!");
        router.push('/screens/Serviceviewpg');
      } else {
        Alert.alert("Error", data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Failed to submit the form. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.semicircle}>
          <Image 
            source={{ uri: 'https://i.im.ge/2025/02/12/HjvsfP.undraw-my-personal-files-886p-removebg-preview.png' }} 
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Fill out the details to register your hostel</Text>
      </View>

      <Text style={styles.sectionTitle}>Food Service Info</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food (Veg/Non-veg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food type"
          placeholderTextColor="#FFFFFF"
          value={formData.FoodType}
          onChangeText={(text) => updateField("FoodType", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food availability</Text>
        <TextInput
          style={styles.input}
          placeholder="Available times"
          placeholderTextColor="#FFFFFF"
          value={formData.availability}
          onChangeText={(text) => updateField("availability", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rate of food per day</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter rate"
          keyboardType="numeric"
          placeholderTextColor="#FFFFFF"
          value={formData.Rate}
          onChangeText={(text) => updateField("Rate", text)}
        />
      </View>

      <Text style={styles.sectionTitle}>Food Menu</Text>

      {daysOfWeek.map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayLabel}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
          <TextInput
            style={styles.dayInput}
            placeholder={`Enter food items for ${day}`}
            placeholderTextColor="#FFFFFF"
            value={formData[day]}
            onChangeText={(text) => updateField(day, text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 90,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 120,
    marginLeft: 20,
    color: '#FFF',
  },
  sectionTitle: { 
    fontSize: 23, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginLeft: 8, 
    color: '#FFF' 
  },
  inputContainer: {
    marginBottom: 15,
    marginLeft: 8,
  },
  label: {
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1C1C5E', 
    marginBottom: 5,
  },
  input: {
    borderWidth: 1, 
    borderColor: '#CCC',
    borderRadius: 5, 
    padding: 10, 
    fontSize: 16,
    color:'#fff', 
    backgroundColor: '#D9BD8E',
  },
  submitButton: {
    backgroundColor: '#1C1C5E', 
    paddingVertical: 15, 
    borderRadius: 35, 
    alignItems: 'center', 
    marginTop: 20, 
    marginHorizontal: 20, 
    elevation: 5, 
    shadowColor: "#0000", 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 6,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayContainer: {
    marginBottom: 15,
    marginLeft: 8,
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C5E',
    marginBottom: 5,
  },
  dayInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#D9BD8E',
  },
  
});
