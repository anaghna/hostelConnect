import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Axios from '../Axios/Axios'
export default function Comparison() {
  const searchRef = useRef(null);
  const [hostel1, setHostel1] = useState(null); // State for first hostel
  const [hostel2, setHostel2] = useState(null); // State for second hostel
  const [hostel1Details, setHostel1Details] = useState(null); // Detailed data for hostel 1
  const [hostel2Details, setHostel2Details] = useState(null); // Detailed data for hostel 2

  // Function to fetch hostels
  const fetchHostel = async (setHostelState, setDetailState) => {
    Keyboard.dismiss();
    searchRef.current?.focus();

    try {
      const response = await Axios.get("/getallhostel"); // Replace with actual API URL
      const data = response.data;
      if (data.length > 0) {
        const randomHostel = data[Math.floor(Math.random() * data.length)]; // Pick a random hostel
        setHostelState(randomHostel);
        fetchHostelDetails(randomHostel._id, setDetailState); // Fetch details for the selected hostel
      } else {
        setHostelState(null);
        setDetailState(null);
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  // Function to fetch hostel details by ID
  const fetchHostelDetails = async (hostelId, setDetailState) => {
    try {
      const response = await Axios.get(`/getHostalinfo/${hostelId}`);
      const data = await response.data;
      console.log(data.hostalinfoData[0],"data")
      setDetailState(data.hostalinfoData[0]); // Store the detailed hostel info
    } catch (error) {
      console.error("Error fetching hostel details:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Two Fetch Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.fetchButton} onPress={() => fetchHostel(setHostel1, setHostel1Details)}>
            <Text style={styles.fetchButtonText}>Select Hostel 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fetchButton} onPress={() => fetchHostel(setHostel2, setHostel2Details)}>
            <Text style={styles.fetchButtonText}>Select Hostel 2</Text>
          </TouchableOpacity>
        </View>

        {/* Display Two Hostels for Comparison */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.comparisonContainer}>
            {/* Hostel 1 */}
            <View style={styles.hostelBox}>
              <Text style={styles.hostelTitle}>Hostel 1</Text>
              {hostel1 ? <Text style={styles.hostelName}>{hostel1.HostalName}</Text> : <Text style={styles.noDataText}>No Hostel Selected</Text>}
            </View>

            {/* Hostel 2 */}
            <View style={styles.hostelBox}>
              <Text style={styles.hostelTitle}>Hostel 2</Text>
              {hostel2 ? <Text style={styles.hostelName}>{hostel2.HostalName}</Text> : <Text style={styles.noDataText}>No Hostel Selected</Text>}
            </View>
          </View>

          {/* Detailed Hostel Info Section */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsHeader}>Hostel Details</Text>

            {/* Hostel 1 Details */}
            {hostel1Details && (
              <View style={styles.detailBox}>
                {/* <Text style={styles.detailTitle}>{hostel1Details.acStatus}</Text> */}
                <Text style={styles.detailText}>AC:  status{hostel1Details.acStatus}</Text>
                <Text style={styles.detailText}>Room Type: {hostel1Details.roomType}</Text>
                <Text style={styles.detailText}>Facilities: {hostel1Details.facilities}</Text>
              </View>
            )}

            {/* Hostel 2 Details */}
            {hostel2Details && (
              <View style={styles.detailBox}>
                <Text style={styles.detailTitle}>{hostel2Details.name}</Text>
                <Text style={styles.detailText}>Ac Status: {hostel2Details.acStatus}</Text>
                <Text style={styles.detailText}>Room Type: {hostel2Details.roomType}</Text>
                <Text style={styles.detailText}>Facilities: {hostel2Details.facilities}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E0B974",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  fetchButton: {
    backgroundColor: "#1C1C5E",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "48%",
  },
  fetchButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#E0B974",
  },
  comparisonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  hostelBox: {
    width: "48%",
    padding: 15,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    alignItems: "center",
  },
  hostelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C5E",
    marginBottom: 5,
  },
  hostelName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C5E",
  },
  noDataText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  detailsContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#E0B974",
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C5E",
    textAlign: "center",
    marginBottom: 10,
  },
  detailBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C5E",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
  },
});
