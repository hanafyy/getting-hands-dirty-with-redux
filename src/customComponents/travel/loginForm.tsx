import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addUser } from "@/app/features/travel/userLoggedSlice"; // import the addUser action
import { RootState } from "@/app/store";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simulated user data (you could replace this with a real API call)
  const userData = useSelector((state: RootState) =>
    state.users.find(
      (user) => user.email === email && user.password === password
    )
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate if user exists in user data (dummy authentication check)
    if (userData) {
      dispatch(addUser(userData)); // Dispatch action to log in the user
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.fullName}`,
      });
      navigate("/user-bookings");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password.",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
