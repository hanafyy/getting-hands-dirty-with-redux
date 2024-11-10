import React from "react";
import { PlaneIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flight } from "@/interfaces/interfaces";

interface FlightCardProps {
  flight: Flight;
  onBook: () => void;
}

const BookingFlightCard: React.FC<FlightCardProps> = ({ flight, onBook }) => {
  return (
    <Card className="w-full max-w-md flex h-full flex-col shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">Flight</span>
          <PlaneIcon className="w-6 h-6 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Departure: {flight.departure}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Arrival: {flight.arrival}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Date: {flight.date}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full" onClick={onBook}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingFlightCard;
