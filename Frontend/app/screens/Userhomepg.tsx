import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TextInput, ScrollView,
  Image, TouchableOpacity, Dimensions, Alert, Platform, Modal, TouchableWithoutFeedback,
  Button
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");
import Axios from '../Axios/Axios'
export default function UserSecond() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");
  const [hostels, setHostels] = useState([]);
  const [foodServices, setFoodServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]); // Array to store selected filters
  const[hostalFilter,setHostelsFilter] = useState([])
  const [viewBtn,setViewBtn] = useState(true)
  // Function to get stored data
  const getUserData = async () => {
    try {
      let userData;
      if (Platform.OS === "web") {
        userData = localStorage.getItem("userData");
      } else {
        userData = await AsyncStorage.getItem("userData");
      }

      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.username || "Guest");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };
  const fetchHostels = async () => {
    try {
      setViewBtn(true)
      console.log("view---")
      const response = await Axios.get(`/getallhostel`);
      console.log(response,"view")
      const data = response.data
      setHostels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setHostels([]);
    }
  };

  // Fetch user data & hostel/food services
  useEffect(() => {
    getUserData();

    const fetchHostels = async () => {
      try {
        const response = await Axios.get("/getallhostel");
        const data = response.data
        console.log(response,"resposne..")
        setHostels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching hostels:", error);
        setHostels([]);
      }
    };

    const fetchFoodServices = async () => {
      try {
        const response = await Axios.get("/getallmess");
        const data = response.data;
        setFoodServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching food services:", error);
        setFoodServices([]);
      }
    };

    fetchHostels();
    fetchFoodServices();
  }, []);

  // Search Filtering Logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredHostels([...hostels]);
    } else {
      console.log(hostels,"hostels")
      const filtered = hostels.filter((hostel) =>
       
        hostel.HostalName?.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      console.log(filtered,"filtered")
      setFilteredHostels(filtered);
    }
  }, [searchQuery, hostels]);

  // Logout Function (Supports Web & Mobile)
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            if (Platform.OS === "web") {
              localStorage.removeItem("userData");
            } else {
              await AsyncStorage.removeItem("userData");
            }
            router.push('/screens/Usersignin')
          },
        },
      ]
    );
  };

  // Filter options
  const filterOptions = [
    { label: "Mens Hostel", value: "mens" },
    { label: "Ladies Hostel", value: "ladies" },
    { label: "WiFi Available", value: "wifi" },
    { label: "AC Available", value: "ac" },
    { label: "All", value: "all" },

  ];
  

  // Toggle filter selection
  const toggleFilter = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };


  const fetchDetailedHostels = async () => {
    try {
      const response = await Axios.get("/getostalAllHostelsDetails");
      const data = response.data
      console.log(response,"array of filter")
      if (Array.isArray(data)) {
        setHostelsFilter(data); 
      } else {
        console.error("Invalid data format from API");
        setHostelsFilter([]);
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setHostelsFilter([]);
    }
  };


  useEffect(() => {
    fetchDetailedHostels();
  }, []);
  
  // Apply filters
  const applyFilters = () => {
    let filtered = [...hostalFilter];

    console.log(filtered,"filtered values")
    selectedFilters.forEach((filter) => {
      setViewBtn(false)
      switch (filter) {
        
        case "mens":
          filtered = filtered.filter((hostel) => hostel.type == "Mens");
          console.log(filtered,"gendar ststus..")
          break;
        case "ladies":
          filtered = filtered.filter((hostel) => hostel.type == "ladies");
          break;
        case "wifi":
          filtered = filtered.filter((hostel) => hostel.facilities == "Wifi");
          console.log(filtered,"ac status..")
          break;
        case "ac":
          filtered = filtered.filter((hostel) => hostel.acStatus == "AC");
          console.log(filtered,"ac status..")
          break;
        case "All":
          filtered = filtered.filter((hostel) => hostel._id);
          break;
        default:
          break;
      }
    });
  
    setFilteredHostels(filtered);
    setFilterVisible(false);
  };
  

  // Handle Hostel Press
  const handleHostelPress = (id) => {
    router.push(`/screens/S&vuserpg?id=${id}`);
  };

  // Handle Mess Press (this was missing in your original code)
  const handleMessPress = (id) => {
    router.push(`/screens/Servicedetailpg?id=${id}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Navbar */}
        <View style={styles.header}>
          <FontAwesome name="bars" size={24} color="white" />
          <Text style={styles.greeting}>Hi {userName}!</Text>
     
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome name="sign-out" size={24} color="white" style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Hostel"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <FontAwesome name="filter" size={20} color="#666" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {/* Filter Dropdown Modal */}
        <Modal
          transparent={true}
          visible={filterVisible}
          onRequestClose={() => setFilterVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.filterDropdown}>
                <View style={styles.filterHeader}>
                  <Text style={styles.filterTitle}>Filters</Text>
                  <TouchableOpacity onPress={() => setFilterVisible(false)}>
                    <FontAwesome name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.filterOption,
                      selectedFilters.includes(option.value) && styles.selectedFilterOption,
                    ]}
                    onPress={() => toggleFilter(option.value)}
                  >
                    <Text style={styles.filterOptionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* New Horizontal Scroll Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={styles.featuredCard}>
            <Image source={{ uri: "https://i.im.ge/2025/03/03/He9iv4.image1.jpeg" }} style={styles.featuredImage} resizeMode="cover" />
            <Text style={styles.featuredTitle}>Perfect Stay!</Text>
          </View>
          <View style={styles.featuredCard}>
            <Image source={{ uri: "https://i.im.ge/2025/03/03/He95SC.image2.jpeg" }} style={styles.featuredImage} resizeMode="cover" />
            <Text style={styles.featuredTitle}>Advanced Comparsion Technology</Text>
          </View>
          <View style={styles.featuredCard}>
            <Image source={{ uri: "https://i.im.ge/2025/03/03/He99Nq.image-3.jpeg" }} style={styles.featuredImage} resizeMode="cover" />
            <Text style={styles.featuredTitle}>Homely Food.. Anytime Anywhere!</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.fetchButton} onPress={fetchHostels}>
          <Text style={styles.fetchButtonText}>Refresh Hostels</Text>
        </TouchableOpacity>

        {/* Handpicked For You */}
        <Text style={styles.sectionTitle}>Handpicked For You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {filteredHostels.map((hostel) => (
           <TouchableOpacity 
           key={hostel._id} 
           style={styles.blueCard} 
         
            onPress={() => handleHostelPress(hostalFilter ? hostel.hostalId : hostel._id)}>     
              <Image source={{ uri: hostel.img }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{hostalFilter? hostel.hostalname: ""}</Text>
              {/* <View>
                       <Text style={styles.cardTitle}>{hostalFilter.hostalname}</Text>
              </View> */}
              <Text style={styles.cardTitle}>{hostel.HostalName}</Text>
              <Text style={styles.cardAddress}>{hostel.address}</Text>
              <Text style={styles.cardPrice}>INR {hostel.rate}</Text>
              {
                viewBtn ? 
           
                  
                    <TouchableOpacity style={styles.viewButton} onPress={() => handleHostelPress(hostel._id)}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity> :""
           
              } 
             

            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended Food Services */}
        <Text style={styles.section}>Recommended Food Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {foodServices.map((service) => (
            <TouchableOpacity key={service._id} style={styles.blueCard} onPress={() => handleMessPress(service._id)}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/8671/8671414.png" }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{service.name}</Text>
              <Text style={styles.cardAddress}>{service.address}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    marginLeft:90,
    marginRight:4,
    marginBottom:20,
    height:38,
    width:90,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  viewButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C5E",
    alignItems: "center",
  },
  fetchButton: {
    backgroundColor: '#1C1C5E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginLeft:340,
    width:190,
    //right: 20,
    top: 60,
  },
  fetchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: "#E0B974"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C5E',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 40,
    paddingHorizontal: 22,
  },
  greeting: { 
    fontSize: 29,
    fontWeight: 'bold',
    color: '#ffff',
    marginTop: 5,
    // color: "white", 
    // fontSize: 24, 
    // fontWeight: "bold", 
    marginLeft: 20,
    // marginRight:290, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    color: '#000',
  },
  searchIcon: {
    padding: 10,
    fontSize: 25,
  },
  sectionTitle: {
    fontSize: 26,
    marginTop:10,
    marginBottom:10,
    fontWeight: "bold",
    margin: 15,
    color: "#1C1C5E"
  },
  horizontalScroll: {
    paddingVertical: 20
  },
  blueCard: {
    backgroundColor: "#1C1C5E",
    padding: 10,
    height: 270,
    width:200,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardImage: {
    width: 180,
    height: 150,
    borderRadius: 10,
    padding: 50
  },
  cardTitle: {
    fontSize: 20,
    color: "white",
    marginTop: 5
  },
  cardAddress: {
    fontSize: 14,
    color: "white"
  },
  cardPrice: {
    fontSize: 14,
    color: "white"
  },
  featuredCard: {
    backgroundColor: "#fff",
    height: 340,
    width: 490,
    borderRadius: 10,
    marginLeft: 15,
    padding: 10,
    position: "relative",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  featuredImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopRightRadius: 10
  },
  featuredTitle: {
    fontSize: 22,
    color: "#1C1C5E",
    fontWeight: "bold",
    padding: 10,
    marginTop:20,
    textAlign: "center"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  filterDropdown: {
    backgroundColor: "#1C1C5E",
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffff",
  },
  filterOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedFilterOption: {
    backgroundColor: "#E0B974",
    borderColor: "#1C1C5E",
  },
  filterOptionText: {
    fontSize: 16,
    color: "white",
  },
  selectedFilterOptionText: {
    color: "white",
  },
  applyButton: {
    backgroundColor: "#1C1C5E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section:{
    fontSize: 26,
    marginTop:15,
    marginBottom:10,
    fontWeight: "bold",
    margin: 15,
    color: "#1C1C5E"
  }
});