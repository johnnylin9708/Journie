import { Button, Modal, StyleSheet, TextInput, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ItineraryType } from "@/types/listingType";

type Props = {
  modalVisible: boolean;
  setModalVisible: any;
  selectedItinerary: ItineraryType;
};

const TripInfoModal = ({
  modalVisible,
  setModalVisible,
  selectedItinerary,
}: Props) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{`Enter details for ${selectedItinerary.itinerary}`}</Text>
          <TextInput
            style={styles.input}
            placeholder="Your input"
            // value={formInput}
            // onChangeText={setFormInput}
          />
          {/* <Button title="Submit" onPress={handleSubmit} /> */}
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default TripInfoModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});
