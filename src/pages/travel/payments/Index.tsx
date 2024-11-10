import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Payments() {
  // Fetch bookings and users from the Redux store
  const bookings = useSelector((state: RootState) => state.bookings);
  const users = useSelector((state: RootState) => state.users);

  // Calculate revenue from accepted bookings
  const acceptedBookings = bookings.filter(
    (booking: any) => booking.status === "confirmed"
  );

  const totalRevenue = acceptedBookings.reduce((sum: number, booking: any) => {
    if (booking.type === "flight") {
      return sum + (booking.details.price || 0);
    } else if (booking.type === "car") {
      return sum + (booking.details.pricePerDay || 0);
    } else if (booking.type === "hotel") {
      return sum + (booking.details.roomPrice || 0); // Assuming hotels have roomPrice instead of price
    }
    return sum;
  }, 0);

  // Calculate revenue by type
  const revenueByType = {
    flight: acceptedBookings
      .filter((booking) => booking.type === "flight")
      .reduce((sum, booking: any) => sum + (booking.details.price || 0), 0),
    hotel: acceptedBookings
      .filter((booking) => booking.type === "hotel")
      .reduce(
        (sum, booking: any) => sum + (booking.details.pricePerNight || 0),
        0
      ), // Adjust for hotels
    car: acceptedBookings
      .filter((booking) => booking.type === "car")
      .reduce(
        (sum, booking: any) => sum + (booking.details.pricePerDay || 0),
        0
      ),
  };

  return (
    <div className="p-5 space-y-8">
      {/* Revenue Summary */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Revenue Summary</h1>
        <p>Total Revenue (Accepted Bookings): ${totalRevenue.toFixed(2)}</p>
        <p>Flight Revenue: ${revenueByType.flight.toFixed(2)}</p>
        <p>Hotel Revenue: ${revenueByType.hotel.toFixed(2)}</p>
        <p>Car Rental Revenue: ${revenueByType.car.toFixed(2)}</p>
      </div>

      {/* Bookings Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-left text-gray-600 font-semibold">
                Booking ID
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold">
                Type
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold">
                User
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold">
                Status
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any) => {
              // Get the user who made the booking
              const user = users.find((u) => u.id === booking.userId);

              // Access price conditionally based on booking type
              const price =
                booking.type === "hotel"
                  ? booking.details.pricePerNight // Use roomPrice for hotels
                  : booking.details.price;

              return (
                <tr key={booking.id} className="border-b border-gray-200">
                  <td className="p-3">{booking.id}</td>
                  <td className="p-3 capitalize">{booking.type}</td>
                  <td className="p-3">
                    {user ? user.fullName : "Unknown User"}
                  </td>
                  <td className="p-3 capitalize">{booking.status}</td>
                  <td className="p-3">${price?.toFixed(2) || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
