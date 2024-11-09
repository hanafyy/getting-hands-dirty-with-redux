import {
  CalendarIcon,
  MapPinIcon,
  CarIcon,
  DollarSignIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { removeCar } from "@/app/features/travel/carRentalSlice";
import { CarRental } from "@/interfaces/interfaces";

export default function CarRentalCard({
  id,
  type,
  location,
  availability,
  pricePerDay,
}: CarRental) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleRemove = () => {
    dispatch(removeCar(id));
    toast({
      variant: "destructive",
      title: `Car rental is deleted successfully`,
      description: `The ${type} car in ${location} has been removed.`,
    });
  };

  return (
    <Card className="w-full max-w-md flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">{type} Car</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <CarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Type: {type}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Location: {location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Available: {availability ? "Yes" : "No"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSignIcon className="w-5 h-5 text-muted-foreground" />
          <span>Price per Day: {pricePerDay} $</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <span className="text-xs text-muted-foreground">
          ID: {id.slice(0, 8)}...
        </span>
        <Button variant="destructive" size="sm" onClick={handleRemove}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
