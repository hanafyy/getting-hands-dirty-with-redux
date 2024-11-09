import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { jobInterface, jobInterfaceFull } from "@/interfaces/interfaces";
import { edit } from "@/app/features/jobs/jobsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/app/store";
// Define the type for form data

const EditJobPage: React.FC = () => {
  const { id } = useParams();
  const data = useSelector((state: RootState) =>
    state.job.filter((job: jobInterfaceFull) => job.id === id)
  );
  const selectedItem = data[0];

  const initialFormState: jobInterface = {
    title: selectedItem.title,
    company: selectedItem.company,
    dateStart: selectedItem.dateStart,
    nextStep: selectedItem.nextStep,
    notes: selectedItem.notes,
  };

  const [formData, setFormData] = useState<jobInterface>(initialFormState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  // Handler for text inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", { ...formData, id: id });
    dispatch(edit({ ...formData, id: id as string }));
    const jobs = localStorage.getItem("jobs");
    const parsedJobs = JSON.parse(jobs as string);
    const updatedJobs = parsedJobs.map((job: jobInterfaceFull) =>
      job.id === id ? { ...job, ...formData } : job
    );
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    navigate("/admin/manage/jobs");
    toast({
      title: `Job is updated successfully`,
      description: `The job is Updated for the company ${formData.company} with the id ${id}`,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Edit The Job with id : {id}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Job Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Company</label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <Input
              type="date"
              name="dateStart"
              value={formData.dateStart}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Next Step</label>
            <Input
              name="nextStep"
              value={formData.nextStep}
              onChange={handleChange}
              placeholder="e.g., Schedule Interview"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Notes</label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes here..."
            />
          </div>

          <Button type="submit" variant={"default"} className="w-full mt-4">
            Edit Job
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
