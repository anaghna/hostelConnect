import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function FoodDetailsTable({ foodDetais }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hostel Food Menu</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Day</Text>
        <Text style={styles.headerText}>Type</Text>
        <Text style={styles.headerText}>Breakfast</Text>
        <Text style={styles.headerText}>Lunch</Text>
        <Text style={styles.headerText}>Dinner</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={foodDetais}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.day}</Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.details.Breakfast}</Text>
            <Text style={styles.cell}>{item.details.Lunch}</Text>
            <Text style={styles.cell}>{item.details.Dinner}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E0B974",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1C1C5E",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1C1C5E",
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#D9BD8E",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
});
