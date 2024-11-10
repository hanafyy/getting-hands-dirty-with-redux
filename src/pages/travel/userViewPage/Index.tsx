import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
// Assume this displays individual booking details
import { Booking } from "@/interfaces/interfaces";
import UserBookingCard from "@/customComponents/travel/userBookingCard";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function UserViewPage() {
  // Get the logged-in user
  const loggedInUser = useSelector((state: RootState) => state.loggedUser);
  // Filter bookings based on the logged-in user’s ID
  const userBookings = useSelector((state: RootState) =>
    state.bookings.filter(
      (booking: Booking) => booking.userId === loggedInUser.id
    )
  );

  return (
    <div className="p-5 space-y-4 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <Button type="button">
          <NavLink to={"/book-your-need"}>Book Something</NavLink>
        </Button>
      </div>
      <hr />
      {userBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {userBookings.map((booking: Booking, index: number) => (
            <UserBookingCard key={index} {...booking} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings found</p>
      )}
    </div>
  );
}

export default UserViewPage;
