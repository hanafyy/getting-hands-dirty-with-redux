import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "@/app/features/travel/userSlice"; // Assumes there's a slice for user management
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
const AddUsers = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email and Password are required.",
      });
      return;
    }

    // Dispatch addUser action
    dispatch(
      addUser({
        email,
        password,
        fullName,
        role,
        id: uuidv4(),
        dateAdded: Date.now(),
      })
    );

    toast({
      title: "User added successfully",
      description: `User ${email} has been added.`,
    });

    // Reset form fields
    setEmail("");
    setPassword("");
    setFullName("");
    setRole("");
  };

  return (
    <div className="flex items-center justify-center h-full min-h-screen w-full">
      <Card className="w-full max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg m-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter user password"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name (optional)"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Role</label>
              <Input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter user role (optional)"
              />
            </div>

            <Button type="submit" variant="default" className="w-full mt-4">
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUsers;
