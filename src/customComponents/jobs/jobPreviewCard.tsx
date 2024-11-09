import { CalendarIcon, BriefcaseIcon, ArrowRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jobInterfaceFull } from "@/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/app/features/jobs/userJobSlice";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/app/store";

export default function JobPreviewCard({
  company,
  dateStart,
  id,
  nextStep,
  notes,
  title,
}: jobInterfaceFull) {
  const data = useSelector((state: RootState) => state.userJobs);
  const dispatch = useDispatch();

  function handleAddToUser() {
    const payload = {
      company,
      dateStart,
      id,
      nextStep,
      notes,
      title,
    };

    // Check if the job already exists in the array
    const jobExists = data.some((job: jobInterfaceFull) => job.id === id);

    if (jobExists) {
      toast({
        title: `You applied for this job before`,
        description: `You can preview it in your applications from ${company} with the id ${id}.`,
      });
    } else {
      dispatch(add(payload));
      toast({
        title: `You applied for this job successfully`,
        description: `You can preview it in your applications from ${company} with the id ${id}.`,
      });
    }
  }

  return (
    <Card className="w-full max-w-md h-full min-h-full flex flex-col">
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
            <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-2">
              {notes}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <span className="text-xs text-muted-foreground">
          Job ID: {id.slice(0, 8)}...
        </span>
        <button
          onClick={handleAddToUser}
          className="flex items-center space-x-1 text-sm font-medium text-primary hover:underline"
        >
          <span>Apply</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </CardFooter>
    </Card>
  );
}
