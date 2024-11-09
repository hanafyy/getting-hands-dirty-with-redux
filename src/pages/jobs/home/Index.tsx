import { RootState } from "@/app/store";
import JobPreviewCard from "@/customComponents/jobs/jobPreviewCard";
import { jobInterfaceFull } from "@/interfaces/interfaces";
import { filterJobsByCompany } from "@/lib/filterMapping";
import { useSelector } from "react-redux";
function Index() {
  const data = useSelector((state: RootState) => state.job);
  const searchValue = useSelector((state: RootState) => state.search);
  const filteredData = filterJobsByCompany(data, searchValue);
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full h-full p-5">
      {filteredData.length > 0 ? (
        filteredData.map((job: jobInterfaceFull, index: number) => (
          <JobPreviewCard
            company={job.company}
            dateStart={job.dateStart}
            id={job.id}
            nextStep={job.nextStep}
            notes={job.notes}
            title={job.title}
            key={index}
          />
        ))
      ) : (
        <div className="w-full h-full col-span-full flex items-center justify-center text-center  max-w-lg mx-auto">
          <span className="text-muted-foreground">
            no company contains this search term{" "}
            <strong className="text-black">{searchValue}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

export default Index;
