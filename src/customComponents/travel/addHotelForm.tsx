import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHotel } from "@/app/features/travel/hotelSlice";
import { Hotel } from "@/interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddHotelForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHotel: Hotel = {
      id: uuidv4(),
      name,
      location,
      availableRooms: parseInt(availableRooms),
      pricePerNight: parseFloat(pricePerNight),
      rating: parseFloat(rating),
    };

    dispatch(addHotel(newHotel));

    setName("");
    setLocation("");
    setAvailableRooms("");
    setPricePerNight("");
    setRating("");

    toast({
      title: `A new hotel is added successfully`,
      description: `Hotel ${name} has been added with ID ${newHotel.id}`,
    });
    navigate("/");
  };

  return (
    <Card className="w-full max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg m-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Add New Hotel</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Hotel Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter hotel name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Available Rooms</label>
            <Input
              type="number"
              value={availableRooms}
              onChange={(e) => setAvailableRooms(e.target.value)}
              placeholder="Number of available rooms"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price Per Night</label>
            <Input
              type="number"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              placeholder="Price per night"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Rating</label>
            <Input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Hotel rating (1-5)"
              required
              min="1"
              max="5"
              step="0.1"
            />
          </div>

          <Button type="submit" variant="default" className="w-full mt-4">
            Add Hotel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddHotelForm;
