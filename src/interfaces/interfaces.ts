export interface jobInterface {
  title: string;
  company: string;
  dateStart: string;
  nextStep: string;
  notes: string;
}

export interface jobInterfaceFull extends jobInterface {
  id: string;
}

export interface jobInterfaceFullApplied extends jobInterfaceFull {
  status: string;
}

// end of first project

export interface Flight {
  id: string;
  departure: string;
  arrival: string;
  date: string;
  price: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  availableRooms: number;
  pricePerNight: number;
  rating: number;
}

export interface CarRental {
  id: string;
  type: string;
  location: string;
  availability: boolean;
  pricePerDay: number;
}

export interface Booking {
  id: string;
  type: "flight" | "hotel" | "car";
  details: Flight | Hotel | CarRental;
  status: "confirmed" | "pending" | "canceled";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    flightClass: "economy" | "business" | "first";
    hotelRating: number;
  };
}
