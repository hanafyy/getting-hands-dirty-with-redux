import React from "react";
import { HotelIcon, MapPinIcon, BedIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/interfaces/interfaces";

interface HotelCardProps {
  hotel: Hotel;
  onBook: () => void;
}

const BookingHotelCard: React.FC<HotelCardProps> = ({ hotel, onBook }) => {
  return (
    <Card className="w-full max-w-md flex h-full flex-col shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">Hotel</span>
          <HotelIcon className="w-6 h-6 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Location: {hotel.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BedIcon className="w-5 h-5 text-muted-foreground" />
          <span>Available Rooms: {hotel.availableRooms}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Price per Night: ${hotel.pricePerNight}</span>
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

export default BookingHotelCard;
