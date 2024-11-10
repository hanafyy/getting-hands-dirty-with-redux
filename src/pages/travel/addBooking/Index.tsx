import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { NavLink, useNavigate } from "react-router-dom";
import { addBooking } from "@/app/features/travel/bookingsSlice"; // Assume addBooking action exists
import { Input } from "@/components/ui/input";
import BookingFlightCard from "@/customComponents/travel/bookingFlightCard";
import BookingHotelCard from "@/customComponents/travel/bookingHotelCard";
import BookingCarRentalCard from "@/customComponents/travel/bookingCarRentalCard";
import { Flight, Hotel, CarRental } from "@/interfaces/interfaces";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
function BookingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  // Retrieve user and items from Redux store
  const loggedInUser = useSelector((state: RootState) => state.loggedUser);
  const flights = useSelector((state: RootState) => state.flights);
  const hotels = useSelector((state: RootState) => state.hotels);
  const cars = useSelector((state: RootState) => state.cars);
  const bookings = useSelector((state: RootState) => state.bookings);
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Redirect to login if no user is logged in
  if (!loggedInUser.id) {
    navigate("/login");
    return null;
  }

  // Filter function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterItems = (items: any[], key: string) =>
    items.filter((item) =>
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Book an item
  const handleBookItem = (
    item: Flight | Hotel | CarRental,
    type: "flight" | "hotel" | "car"
  ) => {
    const bookingId = `${type}-${item.id}`;

    // Check if the booking already exists
    const existingBooking = bookings.find(
      (booking) =>
        booking.id === bookingId && booking.userId === loggedInUser.id
    );

    if (existingBooking) {
      // Show a warning toast if the booking already exists
      toast({
        title: "Duplicate Booking",
        description: `You have already requested a booking for this ${type}.`,
      });
      return;
    }

    // Create a new booking if no duplicate exists
    const newBooking = {
      id: bookingId,
      type,
      details: item,
      status: "pending",
      userId: loggedInUser.id,
    };
    dispatch(addBooking(newBooking));

    toast({
      title: "Booking Submitted",
      description: `Your booking request for the ${type} has been successfully submitted.`,
    });
  };

  // Filtered items
  const filteredFlights = filterItems(flights, "departure");
  const filteredHotels = filterItems(hotels, "location");
  const filteredCars = filterItems(cars, "type");

  return (
    <div className="w-full h-full min-h-screen p-5 flex flex-col gap-10">
      {/* Search Input */}
      <div className="w-full  flex md:flex-row flex-col justify-between items-center">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for flights, hotels, or cars..."
          className="w-1/2 p-2 border border-gray-300 rounded-2xl h-14"
        />
        <Button type="button">
          <NavLink to={"/user-bookings"}>Your Bookings</NavLink>
        </Button>
      </div>
      <hr />

      {/* Flights Section */}

      <h2 className="text-2xl font-semibold mb-2">Available Flights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-52 gap-4 ">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <BookingFlightCard
              key={flight.id}
              flight={flight}
              onBook={() => handleBookItem(flight, "flight")}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No flights available
          </p>
        )}
      </div>
      <hr className="mb-4" />

      {/* Hotels Section */}

      <h2 className="text-2xl font-semibold mb-2">Available Hotels</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-52 gap-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <BookingHotelCard
              key={hotel.id}
              hotel={hotel}
              onBook={() => handleBookItem(hotel, "hotel")}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No hotels available
          </p>
        )}
      </div>
      <hr className="mb-4" />

      {/* Cars Section */}

      <h2 className="text-2xl font-semibold mb-2">Available Car Rentals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-52 gap-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <BookingCarRentalCard
              key={car.id}
              car={car}
              onBook={() => handleBookItem(car, "car")}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No car rentals available
          </p>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
