import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFlight } from "@/app/features/travel/flightSlice";
import { Flight } from "@/interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddFlightForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFlight: Flight = {
      id: uuidv4(),
      departure,
      arrival,
      date,
      price: parseFloat(price),
    };

    dispatch(addFlight(newFlight));
    setDeparture("");
    setArrival("");
    setDate("");
    setPrice("");
    toast({
      title: `A new flight is added successfully`,
      description: `The flight departure from ${departure} with the id ${newFlight.id}`,
    });
    navigate("/");
  };

  return (
    <Card className="w-full max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Add New Flight</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Departure Location
            </label>
            <Input
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="Enter departure location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Arrival Location</label>
            <Input
              type="text"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              placeholder="Enter arrival location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>

          <Button type="submit" variant="default" className="w-full mt-4">
            Add Flight
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFlightForm;
