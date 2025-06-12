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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Axios from '../Axios/Axios'
export default function HostelRegistrationForm() {
  const router = useRouter();

  // State for form inputs
  const [roomType, setRoomType] = useState("");
  const [hostalname, sethostalname] = useState("");
  const [residents, setResidents] = useState("");
  const [acStatus, setAcStatus] = useState("");
  const [facilities, setFacilities] = useState("");
  const [residentDetails, setResidentDetails] = useState("");
  const [hostalId, setHostalId] = useState(""); // State for user _id
  const [vaccency,setVaccency] = useState("")
  const [type, setType] = useState(""); // For Mens/Ladies hostel
  // const [hostalName,setHostalName] = useState("")
  // Fetch user _id from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        console.log(userData,"hpstal data")
        if (userData) {
          const user = JSON.parse(userData);
          setHostalId(user.user._id); // Extract and set _id
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId();
  }, []);

  // Function to handle form submission
  const handleSubmit = async () => {
    console.log("--")
    // if (!roomType || !residents || !acStatus || !hostalId || !vaccency || hostalname || type) {
    //   console.log("somthing eroor",roomType,residents,acStatus,hostalId,vaccency,hostalname,type,facilities,vaccency)
    //   Alert.alert("Error", "Please fill in all required fields!");
    //   return;
    // }
    const payload = {
      hostalname,
      roomType,
      residents: parseInt(residents, 10),
      acStatus,
      facilities,
      residentDetails,
      hostalId,
      vaccency,
      type // Add this to send Mens/Ladies info
    };
    console.log(" no payload")

        console.log(payload,"payload")
    try {
      const response = await Axios.post("/addalInfo", {payload});

      const data = response.data;
      console.log(data);

      if (response.ok) {
        Alert.alert("Success", "Hostel Registered Successfully!");
        router.push('/screens/Ownerview'); // Navigate after successful submission
      } else {
        Alert.alert("Error", data.error || "Failed to register hostel");
      }
    } catch (error) {
      Alert.alert("Network Error", "Failed to connect to server!");
      console.error("API Error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
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

      {/* Form Section */}
      <Text style={styles.sectionTitle}>Room Info</Text>


      <View style={styles.inputContainer}>
       

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Room Type</Text>
        <TextInput 
          style={styles.input} 
          value={roomType} 
          onChangeText={setRoomType} 
          placeholder="e.g. Single/Double" 
        />
      </View>

      <Text style={styles.label}>Hostal Name</Text>
        <TextInput 
          style={styles.input} 
          value={hostalname} 
          onChangeText={sethostalname} 
          placeholder="eg:matha" 
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>No of Residents per Room</Text>
        <TextInput 
          style={styles.input} 
          value={residents} 
          onChangeText={setResidents} 
          placeholder="e.g. 2" 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ac/Non Ac</Text>
        <TextInput 
          style={styles.input} 
          value={acStatus} 
          onChangeText={setAcStatus} 
          placeholder="e.g. AC/Non-AC" 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Other Facilities</Text>
        <TextInput 
          style={styles.input} 
          value={facilities} 
          onChangeText={setFacilities} 
          placeholder="e.g. Wi-Fi, Laundry" 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Resident Details (optional)</Text>
        <TextInput 
          style={styles.input} 
          value={residentDetails} 
          onChangeText={setResidentDetails} 
          placeholder="Additional details" 
        />
        
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vacancy Details </Text>
        <TextInput 
          style={styles.input} 
          value={vaccency} 
          onChangeText={setVaccency} 
          placeholder="vaccency details" 
        />
        
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hostel Type</Text>
        <TextInput 
          style={styles.input} 
          value={type} 
          onChangeText={setType} 
          placeholder="e.g. Mens/Ladies" 
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Hostel Name</Text>
        <TextInput 
          style={styles.input} 
          value={hostalName} 
          onChangeText={setHostalName} 
          placeholder="e.g. Mens/Ladies" 
        />
      </View> */}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1, 
    paddingBottom: 120, 
    paddingHorizontal: 20, 
    backgroundColor: '#E0B974' 
  },
  header: { 
    backgroundColor: '#E0B974', 
    paddingBottom: 100, 
    position: 'relative' 
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
    overflow: 'hidden' 
  },
  headerImage: { 
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    top: 0, left: 0 
  },
  backButton: { 
    position: 'absolute', 
    top: 20, 
    left: 20, 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 10 
  },
  backButtonText: { 
    color: '#fff', 
    fontSize: 27, 
    fontWeight: 'bold' 
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 130, 
    marginLeft: 8, 
    color: '#FFF' 
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
    marginBottom: 5 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#CCC',
    borderRadius: 5, 
    padding: 10, 
    fontSize: 16,
    color:'#fff', 
    backgroundColor: '#D9BD8E' 
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
    shadowRadius: 6 
  },
  submitButtonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});
