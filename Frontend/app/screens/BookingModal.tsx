import React, { useState, useEffect } from "react";
import { 
  View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from '../Axios/Axios'
const BookingModal = ({ isVisible, onClose, hostel }) => {
  const [description, setDescription] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [user, setUser] = useState(null);

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle booking confirmation
  const handleBooking = async () => {
    console.log("working click",hostel)
    // if (!description || !joiningDate) {
    //   Alert.alert("Error", "Please fill all fields!");
    //   return;
    // }

    // const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    // if (!dateRegex.test(joiningDate)) {
    //   Alert.alert("Error", "Please enter a valid date (YYYY-MM-DD).");
    //   return;
    // }

    if (!user) {
      Alert.alert("Error", "User not found. Please log in again.");
      return;
    }

    const bookingData = {
      hostelId: hostel._id,
      userId: user._id,  // Assuming user object has an `id`
      user,
      hostel,
      joiningDate,
      description,
    };
    console.log("working",bookingData)
    try {
      const response = await Axios.post("/addBooking", {
        bookingData
      });
      const result = response.data
      console.log("Booking API Response:", result);
      if (response.ok) {
        Alert.alert("Success", "Booking confirmed successfully!");
        setDescription("");
        setJoiningDate("");
        onClose();
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Booking API error:", error);
      Alert.alert("Error", "Failed to book hostel. Please try again.");
    }

    Keyboard.dismiss(); // Close keyboard
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Book Your Hostel</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Expected joining Date (YYYY-MM-DD)"
            placeholderTextColor="#888"
            value={joiningDate}
            onChangeText={setJoiningDate}
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleBooking}>
              <Text style={styles.submitButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1C1C5E",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  closeButton: {
    flex: 1,
    backgroundColor: "#B22222",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#1C1C5E",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingModal;
