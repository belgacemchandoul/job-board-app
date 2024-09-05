"use client";
import { Job } from "@/types/Job";
import truncateDescription from "../utils/truncateDescription";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import JobDetails from "./JobDetails";
import CloseIcon from "@mui/icons-material/Close";
interface JobsList {
  jobs: Job[];
}
const JobsList: React.FC<JobsList> = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  const searchParam = useSearchParams();
  const jobId = searchParam.get("jobId");

  useEffect(() => {
    const initialJob: Job | undefined = jobId
      ? jobs.find((job: Job) => job.id === jobId)
      : jobs[0];

    if (initialJob && initialJob.id) {
      setSelectedJob(initialJob);

      if (!jobId || jobId !== initialJob.id) {
        const params = new URLSearchParams(window.location.search);
        params.set("jobId", initialJob.id);
        router.replace(`/jobs?${params.toString()}`, { scroll: false });
      }
    }
    console.log(typeof initialJob?.id);
  }, [jobs, jobId, router]);

  const handleSelectedJob = (job: Job) => {
    setSelectedJob(job);
    setShowDetails(true);
    const params = new URLSearchParams(window.location.search);
    params.set("jobId", job.id || "");
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 h-screen mx-4 sm:mx-8 lg:mx-14 md:gap-4 mb-3 ">
      <section className="flex flex-col gap-5 pr-2 overflow-y-scroll scrollbar-thin scrollbar-thumb lg:col-span-1 col-span-2">
        {jobs.map((job: Job) => (
          <div
            key={job.id}
            className="flex flex-col gap-4 border rounded-md p-4 lg:p-6 cursor-pointer"
            onClick={() => handleSelectedJob(job)}
          >
            <span className="text-[#003366] font-bold text-lg lg:text-xl">
              {job.title}
            </span>
            <span className="font-extralight">
              {truncateDescription(job.description, 10)}
            </span>
          </div>
        ))}
      </section>
      {showDetails && selectedJob && (
        <div className="lg:col-span-2 col-span-3 overflow-y-auto scrollbar-thin scrollbar-thumb pr-2 flex justify-center items-center min-h-[70%]">
          <div className="relative">
            <JobDetails selectedJob={selectedJob} />
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-2 right-2 text-sm text-[#003366] md:hidden block"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
export default JobsList;

{
  /* <div className="col-span-2 overflow-y-auto scrollbar-thin scrollbar-thumb pr-2">
        <JobDetails selectedJob={selectedJob} />
      </div> */
}
