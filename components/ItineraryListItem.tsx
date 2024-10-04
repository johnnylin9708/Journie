import Colors from "@/constants/Colors";
import { ItineraryType } from "@/types/listingType";
import React from "react";
import {
  StyleSheet,
  View,
  ViewToken,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
    itineraries: ItineraryType[];
    day: number;
  };
  onPress: (itinerary: ItineraryType) => void;
};

const ItineraryListItem: React.FC<ListItemProps> = React.memo(
  ({ item, viewableItems, onPress }) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);
    return (
      <>
        <Text style={styles.title}>Day {item.day}</Text>
        {item.itineraries &&
          item.itineraries.map((itinerary) => (
            <TouchableOpacity onPress={() => onPress(itinerary)}>
              <Animated.View style={[styles.listItem, rStyle]}>
                <View style={styles.contentWrapper}>
                  <Text style={styles.timeText}>Time:{itinerary.time}</Text>
                  <Text style={styles.itineraryText}>
                    Itinerary:{itinerary.itinerary}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
      </>
    );
  }
);

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.black,
    marginLeft: 20,
    marginTop: 10,
  },
  listItem: {
    height: 80,
    width: "90%",
    backgroundColor: "#78CAD2",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 10,
  },
  contentWrapper: {
    // backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10, // Padding for the inner content
    elevation: 3,
  },
  itineraryText: {
    fontSize: 16, // Adjust font size for itinerary name
    fontWeight: "bold", // Make itinerary name bold
    color: "#333", // Darker color for readability
  },
  timeText: {
    fontSize: 14, // Font size for time, smaller than itinerary
    color: "#666", // Lighter color for time
  },
});

export { ItineraryListItem };
