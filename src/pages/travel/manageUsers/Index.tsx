import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Assumes a UserCard component exists for displaying user info
import { UserProfile } from "@/interfaces/interfaces";
import UserCard from "@/customComponents/travel/userCard";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");

  const users = useSelector((state: RootState) => state.users);

  // Filter and Sort Users
  const filteredUsers = users
    .filter(
      (user: UserProfile) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: UserProfile, b: UserProfile) =>
      sortByDate === "asc"
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );

  return (
    <div className="w-full h-full min-h-screen p-5 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-4 mb-5">
        {/* Search Input */}
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-2xl h-14"
        />

        {/* Sort Button */}
        <Button
          onClick={() => setSortByDate(sortByDate === "asc" ? "desc" : "asc")}
          variant="outline"
          className="w-full md:w-auto"
        >
          Sort by Date: {sortByDate === "asc" ? "Oldest First" : "Newest First"}
        </Button>
      </div>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: UserProfile) => (
            <UserCard key={user.id} {...user} />
          ))
        ) : (
          <p className="text-center col-span-full">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
