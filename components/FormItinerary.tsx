import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

interface Itinerary {
  id: number;
  description: string;
}

interface Day {
  day: string;
  itineraries: Itinerary[];
}

const ItineraryPlanner: React.FC = () => {
  const [day, setDay] = useState<string>("");
  const [itineraryDescription, setItineraryDescription] = useState<string>("");
  const [daysList, setDaysList] = useState<Day[]>([]);

  const addDay = () => {
    if (day.trim() && !daysList.find((d) => d.day === day.trim())) {
      setDaysList([...daysList, { day: day.trim(), itineraries: [] }]);
      setDay("");
    }
  };

  const addItinerary = (day: string) => {
    if (itineraryDescription.trim()) {
      const updatedDays = daysList.map((d) => {
        if (d.day === day) {
          return {
            ...d,
            itineraries: [
              ...d.itineraries,
              { id: Date.now(), description: itineraryDescription },
            ],
          };
        }
        return d;
      });
      setDaysList(updatedDays);
      setItineraryDescription("");
    }
  };

  const handleSubmit = () => {
    console.log(daysList);
  };

  const renderItem = ({ item }: { item: Day }) => (
    <View style={styles.dayContainer}>
      <Text style={styles.dayTitle}>{item.day}</Text>
      <FlatList
        data={item.itineraries}
        keyExtractor={(itinerary) => itinerary.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itineraryText}>{item.description}</Text>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Itinerary"
          value={itineraryDescription}
          onChangeText={setItineraryDescription}
        />
        <TouchableOpacity
          onPress={() => addItinerary(item.day)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itinerary Planner</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Day (e.g., Day 1)"
          value={day}
          onChangeText={setDay}
        />
        <TouchableOpacity onPress={addDay} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={daysList}
        keyExtractor={(item) => item.day}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text> Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#00796b",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "#00796b",
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dayContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00796b",
  },
  itineraryText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#00796b",
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 24,
  },
  submitText: {
    textAlign: "center",
    color: "#00796b",
    fontSize: 18,
    marginTop: 10,
  },
});

export default ItineraryPlanner;
