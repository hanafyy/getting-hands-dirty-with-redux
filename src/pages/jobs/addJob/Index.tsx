import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { jobInterface } from "@/interfaces/interfaces";
import { add } from "@/app/features/jobs/jobsSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define the type for form data

const initialFormState: jobInterface = {
  title: "",
  company: "",
  dateStart: "",
  nextStep: "",
  notes: "",
};
const AddJobPage: React.FC = () => {
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
    console.log("Form Data:", { ...formData, id: uuidv4() });
    dispatch(add({ ...formData, id: uuidv4() }));
    setFormData(initialFormState); // Reset form after submission
    const jobs = localStorage.getItem("jobs");
    if (jobs) {
      const parsedJobs = JSON.parse(jobs);
      const newJobs = [...parsedJobs, { ...formData, id: uuidv4() }];
      const newStringfiedJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", newStringfiedJobs);
    } else {
      const newStringfiedJobs = JSON.stringify([{ ...formData, id: uuidv4() }]);
      localStorage.setItem("jobs", newStringfiedJobs);
    }
    navigate("/admin/manage/jobs");
    toast({
      title: `A new job is added successfully`,
      description: `The job is added for the company ${
        formData.company
      } with the id ${uuidv4()}`,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Job</h2>
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
            Add Job
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
