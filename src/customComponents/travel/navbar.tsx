import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function TravelNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-xl font-bold">
                Travel System
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/add-user"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add User
                </NavLink>
                <NavLink
                  to="/add-flights"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Flights
                </NavLink>
                <NavLink
                  to="/add-hotels"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Hotels
                </NavLink>
                <NavLink
                  to="/add-cars"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Cars
                </NavLink>
                <NavLink
                  to="/bookings"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Bookings
                </NavLink>
                <NavLink
                  to="/payments"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Payments
                </NavLink>
                <NavLink
                  to="/manage-users"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  users
                </NavLink>
              </div>
            </div>
          </div>

          {/* User dropdown remains the same */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-3 relative">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt="User avatar"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/add-user"
              className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Add User
            </NavLink>
            <NavLink
              to="/add-flights"
              className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Add Flights
            </NavLink>
            <NavLink
              to="/add-hotels"
              className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Add Hotels
            </NavLink>
            <NavLink
              to="/add-cars"
              className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Add Cars
            </NavLink>
            <NavLink
              to="/bookings"
              className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Bookings
            </NavLink>
            <NavLink
              to="/payments"
              className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Payments
            </NavLink>
            <NavLink
              to="/manage-users"
              className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              users
            </NavLink>
          </div>
          {/* Mobile menu user section remains the same */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {/* ... existing mobile user section code ... */}
          </div>
        </div>
      )}
    </nav>
  );
}
