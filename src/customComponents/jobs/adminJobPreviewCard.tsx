import {
  CalendarIcon,
  BriefcaseIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { jobInterfaceFull } from "@/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { remove } from "@/app/features/jobs/jobsSlice";
import { useToast } from "@/hooks/use-toast";

export default function AdminJobPreviewCard({
  company,
  dateStart,
  id,
  nextStep,
  notes,
  title,
}: jobInterfaceFull) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleRemove = () => {
    dispatch(remove(id));
    const localData = localStorage.getItem("jobs");
    const parsedData = JSON.parse(localData ? localData : "[]");
    const newParsedData = parsedData.filter(
      (job: jobInterfaceFull) => job.id !== id
    );

    localStorage.setItem("jobs", JSON.stringify(newParsedData));
    toast({
      variant: "destructive",
      title: `Job is deleted successfully`,
      description: `The job is Deleted for the company ${company} with the id ${id}`,
    });
  };

  return (
    <Card className="w-full max-w-md flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">{title}</span>
          <Badge variant="secondary">{company}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <span>Start Date: {dateStart}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
          <span>Next Step: {nextStep}</span>
        </div>
        {notes && (
          <div className="space-y-2">
            <h3 className="font-semibold">Notes:</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {notes}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <span className="text-xs text-muted-foreground">
          ID: {id.slice(0, 8)}...
        </span>
        <div className="flex space-x-2">
          <Button type="button" variant="outline" size="sm">
            <NavLink to={`/admin/edit/job/${id}`}>
              <PencilIcon className="w-4 h-4 mr-2" />
            </NavLink>
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  job listing for {title} at {company}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemove}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
