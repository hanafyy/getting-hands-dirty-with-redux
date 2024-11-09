import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCar } from "@/app/features/travel/carRentalSlice";
import { CarRental } from "@/interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const AddCarRentalForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState(false);
  const [pricePerDay, setPricePerDay] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCar: CarRental = {
      id: uuidv4(),
      type,
      location,
      availability,
      pricePerDay: parseFloat(pricePerDay),
    };

    dispatch(addCar(newCar));

    // Reset form fields
    setType("");
    setLocation("");
    setAvailability(false);
    setPricePerDay("");

    toast({
      title: `A new car rental is added successfully`,
      description: `Car type ${type} has been added with ID ${newCar.id}`,
    });
    navigate("/");
  };

  return (
    <Card className="w-full max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg m-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Add New Car Rental
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Car Type</label>
            <Input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Enter car type (e.g., SUV, Sedan)"
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

          <div className="flex items-center">
            <Checkbox
              checked={availability}
              onCheckedChange={(checked) => setAvailability(!!checked)}
              id="availability"
            />
            <label htmlFor="availability" className="ml-2 text-gray-700">
              Available
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price Per Day</label>
            <Input
              type="number"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              placeholder="Enter price per day"
              required
            />
          </div>

          <Button type="submit" variant="default" className="w-full mt-4">
            Add Car Rental
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCarRentalForm;
