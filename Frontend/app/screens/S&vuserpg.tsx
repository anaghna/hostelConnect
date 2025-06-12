import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, 
  Modal, ActivityIndicator, TextInput, FlatList 
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingModal from "./BookingModal";
import { Alert } from "react-native";
import FoodDetailsTable from "./FoodDetailsTable";
import Axios from '../Axios/Axios'
export default function UserHostelDetails() {
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [hostel, setHostel] = useState(null);
  const [extraDetails, setExtraDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompareModalVisible, setCompareModalVisible] = useState(false);
  const [hostelList, setHostelList] = useState([]);
  const [selectedComparison, setSelectedComparison] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false); // State to track favorite status

  // Booking modal inputs
  const [description, setDescription] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [foodDetais,setFoodDetails] = useState([])


  const handleFeedbackSubmit = async () => {
    console.log("setFeedback")
    try {
      // Fetch user data from AsyncStorage
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        Alert.alert("Error", "User data not found! Please log in again.");
        return;
      }
      console.log(userData,"feedback")
      const user = JSON.parse(userData);
  
      // Construct the payload
      const payload = {
        feedback,      // Feedback text
        user, // Extract user ID from local storage
        hosteId: id, // Extract user name (if needed)
      };
      console.log(payload,"payload")
      // Send data to API
      const response = await Axios.post("/FeedBack", {payload});
      const data = response;
      console.log(data);
  
      if (response.ok) {
        Alert.alert("Success", "Feedback submitted successfully!");
      } else {
        Alert.alert("Error", data.error || "Failed to submit feedback");
      }
    } catch (error) {
      Alert.alert("Network Error", "Failed to connect to the server!");
      console.error("API Error:", error);
    }
  };
  
  useEffect(() => {
    const fetchHostelDetails = async () => {
      console.log(id,"id---")
      try {
        const response = await Axios.get(`/get-SIngle-hostal/${id}`);
        console.log(response.data,"single data----")
        const data = response.data 
        console.log(data,"data...")
        setHostel(data);
        if (data._id) {
          const hostelInfoResponse = await Axios.get(`/getHostalinfo/${id}`);
          let extraDetails = hostelInfoResponse.data;
          console.log(extraDetails, "extraDetails");
          setExtraDetails(extraDetails.hostalinfoData[0]);
  
          // Fetch feedback for the hostel
          console.log(id,"id")
          const feedbackResponse = await Axios.get(`/getFeedBack/${id}`);
          const feedbackData = feedbackResponse.data;
          console.log(feedbackData, "feedbacks");
          setReviews(feedbackData || []);
  
          // Fetch booking count
          const bookingCountResponse = await Axios.get(`/getBookingCount/${id}`);
          const bookingCountData = bookingCountResponse.data;
          console.log(bookingCountData, "bookingCount");
          setBookingCount(bookingCountData || 0);
  
          // ✅ Fetch hostel food details
          const foodResponse = await Axios.get(`/getostalFood/${id}`);
          const foodData =  foodResponse.data;
          console.log(foodData, "foodDetails");
          setFoodDetails(foodData || []);
        }
       
      } catch (error) {
        console.error("Error fetching hostel details:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (id) {
      fetchHostelDetails();
    }
  }, [id]);
  
  
  const handleRating = (selectedRating) => {
    console.log("selectedRating")
    console.log(selectedRating,"selectedRating")
    setRating(selectedRating);
  };

  // Handle Favorite Button Click
  const handleFavorite = async (hostelId) => {
    try {
      console.log("fav fn")
      const userData = await AsyncStorage.getItem("userData");
      const user = JSON.parse(userData);

      // if (!user) {
      //   alert("User not found. Please log in.");
      //   return;
      // }
      console.log(user,"user from fav")

      // Toggle favorite state first for immediate UI feedback
      const newFavoriteState = !isFavorited;
      setIsFavorited(newFavoriteState);
      console.log(hostel,"hostal")
      const favoriteData = {
        user: user._id,
        hostelId: hostel,
      };
      console.log(favoriteData,"favoriteData")
      const response = await Axios.post("/addToFavorite", {
       favoriteData
      });

      const result =  response.data;

      if (response.ok) {
        alert(newFavoriteState ? "Added to favorites!" : "Removed from favorites!");
      } else {
        // Revert the state if the API call fails
        setIsFavorited(!newFavoriteState);
        alert("Failed to update favorites: " + result.message);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      // Revert the state if there's an error
      setIsFavorited(!isFavorited);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C1C5E" />
      </View>
    );
  }

  // Fetch all hostels for comparison
  const fetchHostelList = async () => {
    try {
      const response = await Axios.get("/getallhostel");
      const data = response.data;
      setHostelList(data);
      setCompareModalVisible(true);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  // Select a hostel for comparison
  const selectHostelForComparison = async (compareId) => {
    try {
      const response = await fetch(`http://172.16.5.232:3000/getHostalinfo/${compareId}`);
      const data = await response.json();
      setSelectedComparison(data.hostalinfoData[0]);
      setCompareModalVisible(false);
    } catch (error) {
      console.error("Error fetching hostel details:", error);
    }
  };

  // Handle Booking Submission
  const handleBooking = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const user = JSON.parse(userData);

      if (!user) {
        alert("User not found. Please log in.");
        return;
      }

      const bookingData = {
        user: user,
        hostelId: hostel?._id, 
        description,
        joiningDate,
      };

      const response = await fetch("http://172.16.5.232:3000/addBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking Successful!");
        setBookingModalVisible(false);
      } else {
        alert("Booking Failed: " + result.message);
      }
    } catch (error) {
      console.error("Error booking hostel:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={25} color="#fff" />
      </TouchableOpacity>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image 
          source={{ uri: hostel?.img || "https://via.placehoder.com/400" }} 
          style={styles.hostelImage} 
        />
        {/* Hostel Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{extraDetails?.hostalname || "Hostal"}</Text>
            <TouchableOpacity onPress={handleFavorite}>
              <FontAwesome 
                name={isFavorited ? "heart" : "heart-o"} 
                size={27} 
                color={isFavorited ? "red" : "#cc0000"} 
                style={styles.favoriteIcon} 
              />
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.head}>About</Text>
          <Text style={styles.info}>Located just {hostel?.distance} meters from the college, {hostel?.HostalName} offers a comfortable, safe, and budget-friendly living experience for students.</Text> */}
          <Text style={styles.head}>Distance: {hostel?.distance}m from college</Text>
          <Text style={styles.head}>Type: {extraDetails?.type}' Hostal</Text>

          <Text style={styles.head}>INR /month {hostel?.rate || "N/A"}</Text>
          <Text style={styles.head}>Available Ameneties</Text>
          <Text style={styles.info}>Hostal Name: {extraDetails?.hostalname || "N/A"}</Text>
          <Text style={styles.info}>AC Status: {extraDetails?.acStatus || "N/A"}</Text>
          <Text style={styles.info}>Wifi Status: {extraDetails?.facilities || "N/A"}</Text>
          <Text style={styles.info}>Room Type: {extraDetails?.roomType || "N/A"}</Text>
          <Text style={styles.info}>Students per Room: {extraDetails?.residents || "N/A"}</Text>

          {/* vaccncy and waiting below */}

          <Text style={styles.info}>Vacancy: {extraDetails?.vaccency || "N/A"}</Text> 
          <Text style={styles.info}>Waiting: { bookingCount}</Text>

          {/* vaccncy and waiting above */}

          {/* <Text style={styles.head}>Reviews</Text> */}
        </View>
        
        <View style={styles.feedbackContainer}>

        {foodDetais.length > 0 && <FoodDetailsTable foodDetais={foodDetais} />}

  <Text style={styles.head}>Feedback</Text>

  {/* Rating Section */}
  <View style={styles.ratingSection}>
    <Text style={styles.info}>Rate Us</Text>
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleRating(star)}>
          <FontAwesome 
            name={star <= rating ? "star" : "star-o"} 
            size={30} 
            color="yellow" 
            style={styles.starIcon} 
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>

  {/* Feedback Input */}
  <TextInput
    style={styles.feedbackInput}
    placeholder="Write your feedback here..."
    value={feedback}
    onChangeText={setFeedback}
    multiline
  />

  {/* Submit Button */}
  <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>

  {/* Display Existing Reviews */}
  <Text style={styles.subHead}>User Reviews</Text>
  <ScrollView style={styles.reviewContainer}>
  {reviews.length > 0 ? (
    reviews.map((review, index) => (
      <View key={index} style={styles.reviewCard}>
        <Text style={styles.reviewUser}>{review.user?.user?.name || "Anonymous"}</Text>
        <Text style={styles.reviewText}>{review.feedback}</Text>
      </View>
    ))
  ) : (
    <Text style={styles.info}>No reviews yet</Text>
  )}
</ScrollView>

</View>


            
        {/* Comparison Result */}
        {selectedComparison && (
          <View style={styles.comparisonBox}>
            <Text style={styles.comparisonTitle}>Comparison Hostel</Text>
            <Text style={styles.info}>AC Status: {selectedComparison.acStatus}</Text>
            <Text style={styles.info}>Facilities: {selectedComparison.facilities}</Text>
            <Text style={styles.info}>Room Type: {selectedComparison.roomType}</Text>
            <Text style={styles.info}>Residents: {selectedComparison.residents}</Text>
          </View>
        )}
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={fetchHostelList}>
          <Text style={styles.buttonText}>Vacancy</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.button} onPress={() => setBookingModalVisible(true)}>
          <Text style={styles.buttonText}>I'm Interersted</Text>
        </TouchableOpacity>
      </View>
      <BookingModal 
        isVisible={isBookingModalVisible} 
        onClose={() => setBookingModalVisible(false)}
        hostel={hostel}
      />
      {/* Compare Modal */}
      <Modal transparent visible={isCompareModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Select a Hostel to Compare</Text>
            <FlatList
              data={hostelList}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.compareItem} onPress={() => selectHostelForComparison(item._id)}>
                  <Text>{item.HostalName} - {item.distance}M</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.button} onPress={() => setCompareModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#E0B974" 
  },
  backButton: { 
    position: "absolute", 
    top: 40, 
    left: 20, 
    zIndex: 1 , 
  },
  hostelImage: { 
    width: "100%", 
    height: 300 
  },
  comparisonBox: { 
    padding: 20, 
    backgroundColor: "#fff", 
    margin: 10, 
    borderRadius: 8 
  },
  comparisonTitle: { 
    fontWeight: "bold", 
    fontSize: 20, 
    marginBottom: 5 
  },
  compareItem: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderColor: "#ccc" 
  },
  detailsContainer: { 
    padding: 20 
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { 
    fontWeight: "bold", 
    fontSize: 40,
    color: "#1C1C5E",
  },
  favoriteIcon: {
    marginLeft: 10,
  },
  head: { 
    fontSize: 20, 
    marginTop: 25,
    color: "#1C1C5E",
    marginBottom: 5,
    fontWeight: "bold",
  },
  info: { 
    fontSize: 18, 
    marginVertical: 2,
    color: "#1C1C5E",
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0B974",
  },
  buttonContainer: { 
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10, 
    backgroundColor: "#E0B974", 
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 1,
    marginBottom: 2,
  },
  button: { 
    backgroundColor: "#1C1C5E", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    width: "45%",
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    elevation: 5, 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#1C1C5E",
  },
  starIcon: {
    marginRight: 5,
  },
  feedbackContainer: { 
    padding: 20,
  },
  feedbackInput: { 
    marginTop: 9,
    backgroundColor: "#fff", 
    padding: 10, 
    borderRadius: 8, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    height: 100, 
    textAlignVertical: "top" 
  },
  submitButton: { 
    backgroundColor: "#1C1C5E", 
    padding: 10, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 10 
  },
  submitButtonText: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  subHead: {
    fontSize: 20, 
    marginTop: 25,
    color: "#1C1C5E",
    marginBottom: 5,
    fontWeight: "bold",
  },
  reviewContainer: {
    marginTop: 9,
    backgroundColor: "#fff", 
    padding: 10, 
    borderRadius: 8, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    height: 100, 
    textAlignVertical: "top" 
  },
  reviewUser: {
    borderColor: "#aaa",
  },
  reviewText: {
    fontSize: 18, 
    marginVertical: 2,
    color: "#1C1C5E",
  }
});