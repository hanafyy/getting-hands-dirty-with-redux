import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import FlightCard from "@/customComponents/travel/FlightCard";
import HotelCard from "@/customComponents/travel/HotelCard";
import CarRentalCard from "@/customComponents/travel/CarRentalCard";
import { Input } from "@/components/ui/input";

function MainAdminPage() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Select data from Redux store
  const flights = useSelector((state: RootState) => state.flights);
  const hotels = useSelector((state: RootState) => state.hotels);
  const cars = useSelector((state: RootState) => state.cars);

  // Filter functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterItems = (items: any[], key: string) =>
    items.filter((item) =>
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="w-full h-full min-h-screen p-5 flex flex-col gap-3">
      {/* Search Input */}
      <div className="w-full mb-5">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search location..."
          className="w-full p-2 border border-gray-300 rounded-2xl h-14 "
        />
      </div>
      <hr />

      {/* Flights Section */}

      <h2 className="text-2xl font-semibold mb-2">All Flights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-52">
        {filterItems(flights, "departure").length > 0 ? (
          filterItems(flights, "departure").map((flight) => (
            <FlightCard key={flight.id} {...flight} />
          ))
        ) : (
          <div className="w-full h-full col-span-full flex items-center justify-center text-center  max-w-lg mx-auto">
            <span className="text-muted-foreground">
              no flights found contains this search term{" "}
              <strong className="text-black">{searchTerm}</strong>, try
              searching for with another term or add a new flight.
            </span>
          </div>
        )}
      </div>
      <hr className="mb-4" />

      {/* Hotels Section */}

      <h2 className="text-2xl font-semibold mb-2">All Hotels</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-52">
        {filterItems(hotels, "location").length > 0 ? (
          filterItems(hotels, "location").map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))
        ) : (
          <div className="w-full h-full col-span-full flex items-center justify-center text-center  max-w-lg mx-auto">
            <span className="text-muted-foreground">
              no hotels found contains this search term{" "}
              <strong className="text-black">{searchTerm}</strong>, try
              searching for with another term or add a new hotel.
            </span>
          </div>
        )}
      </div>
      <hr className="mb-4" />

      {/* Cars Section */}

      <h2 className="text-2xl font-semibold mb-2">All Cars</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-52">
        {filterItems(cars, "location").length > 0 ? (
          filterItems(cars, "location").map((car) => (
            <CarRentalCard key={car.id} {...car} />
          ))
        ) : (
          <div className="w-full h-full col-span-full flex items-center justify-center text-center  max-w-lg mx-auto">
            <span className="text-muted-foreground">
              no Car found contains this search term{" "}
              <strong className="text-black">{searchTerm}</strong>, try
              searching for with another term or add a new car.
            </span>
          </div>
        )}
      </div>
      <hr className="mb-4" />
    </div>
  );
}

export default MainAdminPage;
