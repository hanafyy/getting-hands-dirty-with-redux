import { CalendarIcon, MapPinIcon, DollarSignIcon } from "lucide-react";
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
import { removeFlight } from "@/app/features/travel/flightSlice";
import { Flight } from "@/interfaces/interfaces";

export default function FlightCard({
  id,
  departure,
  arrival,
  date,
  price,
}: Flight) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleRemove = () => {
    dispatch(removeFlight(id));
    toast({
      variant: "destructive",
      title: `Flight is deleted successfully`,
      description: `The flight from ${departure} to ${arrival} has been removed.`,
    });
  };

  return (
    <Card className="w-full max-w-md flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">
            Flight from {departure} to {arrival}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Departure: {departure}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>Arrival: {arrival}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Date: {date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSignIcon className="w-5 h-5 text-muted-foreground" />
          <span>Price: {price} $</span>
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
