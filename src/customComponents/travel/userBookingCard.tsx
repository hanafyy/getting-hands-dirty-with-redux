import {
  CalendarIcon,
  CarIcon,
  PlaneIcon,
  HotelIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Booking, Hotel, CarRental, Flight } from "@/interfaces/interfaces";
import { Button } from "@/components/ui/button";

const UserBookingCard = ({ type, details, status, id }: Booking) => {
  const getStatusMessage = () => {
    switch (status) {
      case "confirmed":
        return {
          message:
            "Booking confirmed. Please contact support for further assistance.",
          color: "text-green-500",
        };
      case "pending":
        return {
          message: "Booking is pending. Please wait for confirmation.",
          color: "text-yellow-500",
        };
      case "canceled":
        return {
          message:
            "Booking was canceled. Please contact support for further assistance.",
          color: "text-red-500",
        };
      default:
        return { message: "", color: "" };
    }
  };

  const statusInfo = getStatusMessage();

  // Render icons and titles based on booking type
  const renderBookingDetails = () => {
    switch (type) {
      case "flight":
        return (
          <>
            <PlaneIcon className="w-5 h-5 text-muted-foreground" />
            <span>
              Flight from {(details as Flight).departure} to{" "}
              {(details as Flight).arrival}
            </span>
          </>
        );
      case "hotel":
        return (
          <>
            <HotelIcon className="w-5 h-5 text-muted-foreground" />
            <span>Hotel at {(details as Hotel).location}</span>
          </>
        );
      case "car":
        return (
          <>
            <CarIcon className="w-5 h-5 text-muted-foreground" />
            <span>Car rental - {(details as CarRental).type}</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md flex h-full flex-col shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            Booking ID: {id.slice(0, 8)}...
          </span>
          <Badge variant="secondary">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          {renderBookingDetails()}
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <span>
            Status:{" "}
            <span className={`font-semibold ${statusInfo.color}`}>
              {status}
            </span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start mt-auto space-y-2">
        <p className={`text-sm ${statusInfo.color}`}>{statusInfo.message}</p>
        {status === "canceled" && (
          <Button variant="link" className="text-blue-500 underline text-sm">
            <AlertCircleIcon className="inline w-4 h-4 mr-1" />
            Contact Support
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserBookingCard;
