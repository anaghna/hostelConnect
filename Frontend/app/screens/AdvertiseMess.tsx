import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';

export default function AdvertiseHostel() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}> Calling All Mess Owners! </Text>
          <Image 
            source={{ uri: 'https://i.im.ge/2025/03/08/puK7c0.undraw-online-groceries-n03y-removebg-preview.png' }} 
            style={styles.image} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.description}>Why Hostel_Connect is the best?</Text>
          <Text style={styles.paragraph}>
          "Mess Owners, We’ve Got Your Back!"
          </Text>
          <Text style={styles.paragraph}>
            Increase your reach, get your plates empty, and simply shake hands with Hostel Connect. Sign up now 
          and take your food service to the next level! 
          </Text>
          <Text style={styles.description}>Hot Features</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Order Management & Pre-Booking</Text> – Accept, reject, or modify orders in real-time.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Menu Customization</Text> – Add daily, weekly, or monthly meal plans and upload food images for better appeal.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Real-Time Notifications</Text> – Get instant alerts for new orders, cancellations, and payments.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Easy Listing & Management</Text> –  List your mess service with location, menu, and pricing.
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
    marginBottom: 5,
    marginTop: 5,
  },
  image: {
    width: '60%',
    height: 300,
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
