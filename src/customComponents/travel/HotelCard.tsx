import { CalendarIcon, MapPinIcon, BedIcon } from "lucide-react";
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
import { removeHotel } from "@/app/features/travel/hotelSlice";
import { Hotel } from "@/interfaces/interfaces";

export default function HotelCard({
  id,
  name,
  location,
  availableRooms,
  pricePerNight,
}: Hotel) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleRemove = () => {
    dispatch(removeHotel(id));
    toast({
      variant: "destructive",
      title: `Hotel is deleted successfully`,
      description: `The hotel ${name} has been removed.`,
    });
  };

  return (
    <Card className="w-full max-w-md flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">{name} Hotel</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Location: {location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BedIcon className="w-5 h-5 text-muted-foreground" />
          <span>Available Rooms: {availableRooms}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Price per Night: {pricePerNight} $</span>
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
