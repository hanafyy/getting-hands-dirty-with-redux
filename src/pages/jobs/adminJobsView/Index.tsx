import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import AdminJobPreviewCard from "@/customComponents/jobs/adminJobPreviewCard";
import { jobInterfaceFull } from "@/interfaces/interfaces";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function AdminJobsManager() {
  const data = useSelector((state: RootState) => state.job);

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-5 p-5">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="lg:text-4xl font-bold">Manage Added Jobs</h1>
        <div className="flex flex-row items-center justify-center w-fit gap-5">
          <Button variant={"outline"}>
            <NavLink to={"/"}>User Preview</NavLink>
          </Button>
          <Button>
            <NavLink to={"/admin/add/job"}>Add New Job</NavLink>
          </Button>
        </div>
      </div>
      <hr />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full h-full">
        {data.map((job: jobInterfaceFull, index: number) => (
          <AdminJobPreviewCard
            company={job.company}
            dateStart={job.dateStart}
            id={job.id}
            nextStep={job.nextStep}
            notes={job.notes}
            title={job.title}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminJobsManager;
