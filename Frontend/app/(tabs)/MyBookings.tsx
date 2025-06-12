import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, ActivityIndicator, StyleSheet, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from '../Axios/Axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings from backend
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const userDataString = await AsyncStorage.getItem("userData");

      if (!userDataString) {
        Alert.alert("Error", "User not found. Please log in again.");
        return;
      }

      const userData = JSON.parse(userDataString);
      const userId = userData._id; // Assuming user ID is stored in userData
      console.log("Fetching bookings for user:", userId);

      const response = await Axios.get(`/get-my-bookings/${userId}`);
      console.log("Booking response:", response.status);
      
      // Access the data directly from response.data
      // Axios doesn't have an 'ok' property like fetch
      const result = response.data;
      console.log("Booking data:", result);
      
      if (result && Array.isArray(result)) {
        // If the API returns an array directly
        console.log("Setting bookings array:", result.length);
        setBookings(result);
      } else if (result && Array.isArray(result.bookings)) {
        // If the API returns an object with a bookings property
        console.log("Setting bookings from result.bookings:", result.bookings.length);
        setBookings(result.bookings);
      } else {
        console.log("No valid booking data found");
        setBookings([]);
        Alert.alert("Info", "No bookings found");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Alert.alert("Error", "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Format date for better readability
  const formatDate = (dateString) => {
    return dateString || "N/A"; // Just return as is for now, can improve formatting if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1C1C5E" />
      ) : bookings.length === 0 ? (
        <Text style={styles.noBookingText}>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <Text style={styles.hostelName}>
                {item.hostel?.HostalName || "No Name"}
              </Text>
              <Text style={styles.description}>Description: {item.description || "N/A"}</Text>
              <Text style={styles.description}>Distance: {item.hostel?.distance || "N/A"}</Text>
              <Text style={styles.date}>Joining Date: {formatDate(item.joiningDate)}</Text>
              <Text style={styles.date}>Mobile: {item.hostel?.mobile || "N/A"}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1C1C5E",
  },
  noBookingText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  bookingCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  hostelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

export default MyBookings;