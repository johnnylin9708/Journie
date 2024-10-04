import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import FormItinerary from "@/components/FormItinerary";

interface Itinerary {
  id: number;
  description: string;
}

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [itinerary, setItinerary] = useState<string>("");
  const [itineraryList, setItineraryList] = useState<Itinerary[]>([]);
  const [nextId, setNextId] = useState<number>(1); // 用于生成唯一 ID

  const addItinerary = () => {
    if (itinerary.trim()) {
      setItineraryList([
        ...itineraryList,
        { id: nextId, description: itinerary },
      ]);
      setNextId(nextId + 1); // 增加 ID
      setItinerary("");
    }
  };

  const handleSubmit = () => {
    console.log("Destination:", destination);
    console.log("Date:", date);
    console.log("Itineraries:", itineraryList);
    // Reset the form after submission
    setDestination("");
    setDate("");
    setItineraryList([]);
    setNextId(1); // 重置 ID
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                source={{
                  uri: "https://xsgames.co/randomusers/avatar.php?g=female",
                }}
                style={{ width: 40, height: 40, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 10,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={styles.headingTxt}>Record Your Trip!</Text>
        <FormItinerary />
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: "#00796b",
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  itineraryItem: {
    padding: 15,
    backgroundColor: "#e0f7fa",
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#00796b",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Android shadow effect
  },
  activeItem: {
    backgroundColor: "#b2ebf2",
  },
  itineraryText: {
    fontSize: 18,
    color: "#00796b",
  },
});
