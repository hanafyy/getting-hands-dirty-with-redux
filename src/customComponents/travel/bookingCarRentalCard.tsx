import React from "react";
import { CarIcon, MapPinIcon, DollarSignIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CarRental } from "@/interfaces/interfaces";

interface CarRentalCardProps {
  car: CarRental;
  onBook: () => void;
}

const BookingCarRentalCard: React.FC<CarRentalCardProps> = ({
  car,
  onBook,
}) => {
  return (
    <Card className="w-full max-w-md flex h-full flex-col shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">Car Rental</span>
          <CarIcon className="w-6 h-6 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Location: {car?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Type: {car?.type}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSignIcon className="w-5 h-5 text-muted-foreground" />
          <span>Price per Day: ${car?.pricePerDay}</span>
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

export default BookingCarRentalCard;
