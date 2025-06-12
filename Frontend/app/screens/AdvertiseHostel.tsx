import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';

export default function AdvertiseHostel() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}> Smart Renting Starts Here!</Text>
          <Image 
            source={{ uri: 'https://i.im.ge/2025/03/08/puEYdD.undraw-mobile-wireframe-fpih-removebg-preview.png' }} 
            style={styles.image} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.description}>Why Choose Hostel_Connect?</Text>
          <Text style={styles.paragraph}>
            Hostel Connect is the ultimate platform ensuring easy listing options, image uploads, up-to-date notifications, 
            and key feature highlights. Showcasing your hostel has never been easier.
          </Text>
          <Text style={styles.paragraph}>
            Say goodbye to vacancies and hello to an effective way to manage your hostel bookings!
          </Text>
          <Text style={styles.description}>Hot Features</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Easy Listing</Text> – Hostel owners can quickly list their hostels with images and details.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Wide Reach</Text> – Connect with students and professionals looking for accommodations.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Real-Time Updates</Text> – Keep hostel availability and details updated effortlessly.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Vacancy Management</Text> – Easily track and update available hostel rooms.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Advanced Comparison & Filtering</Text> – Find the best hostel options based on location, amenities, and pricing.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E0B974',
    paddingBottom: 20, // Ensures last content is visible
  },
  container: {
    flex: 1,
    backgroundColor: '#E0B974',
    padding: 0,
  },
  headerContainer: {
    backgroundColor: '#1C1C5E',
    height: 400,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20,
  },
  contentContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 2,
  },
  image: {
    width: '90%',
    height: 250,
  },
  description: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1C1C5E',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 20,
    color: '#393838',
    textAlign: 'justify',
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
});
