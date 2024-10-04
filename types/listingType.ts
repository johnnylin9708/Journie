export interface ListingType {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  price: string;
  duration: string;
  location: string;
  category: string;
  schedules: ScheduleType[];
}

export interface ScheduleType {
  day: number;
  itineraryies: ItineraryType[];
}

export interface ItineraryType {
  id: number;
  time: string;
  itinerary: string;
}
