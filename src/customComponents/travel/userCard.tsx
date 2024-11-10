import React from "react";
import { CalendarIcon, MailIcon, UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserProfile } from "@/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { removeUser } from "@/app/features/travel/userSlice"; // Assumes a removeUser action exists

const UserCard: React.FC<UserProfile> = ({
  id,
  fullName,
  email,
  role,
  dateAdded,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeUser(id));
  };

  return (
    <Card className="w-full max-w-md flex h-full flex-col shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">{fullName}</span>
          <Badge variant="secondary">{role}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MailIcon className="w-5 h-5 text-muted-foreground" />
          <span>{email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserIcon className="w-5 h-5 text-muted-foreground" />
          <span>Role: {role}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Date Added: {new Date(dateAdded).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <span className="text-xs text-muted-foreground">
          ID: {id.slice(0, 8)}...
        </span>
        <div className="flex space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
