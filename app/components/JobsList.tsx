"use client";
import { Job } from "@/types/Job";
import truncateDescription from "../utils/truncateDescription";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import JobDetails from "./JobDetails";

interface JobsList {
  jobs: Job[];
}
const JobsList: React.FC<JobsList> = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const router = useRouter();
  const searchParam = useSearchParams();
  const jobId = searchParam.get("jobId");

  useEffect(() => {
    // Determine the initial job
    const initialJob: Job | undefined = jobId
      ? jobs.find((job: Job) => job.id === jobId)
      : jobs[0];

    if (initialJob && initialJob.id) {
      setSelectedJob(initialJob);

      // Update the URL if jobId is not in the URL or doesn't match the selected job's id
      if (!jobId || jobId !== initialJob.id) {
        const params = new URLSearchParams(window.location.search);
        params.set("jobId", initialJob.id); // initialJob.id is guaranteed to be a string here
        router.replace(`/jobs?${params.toString()}`, { scroll: false });
      }
    }
    console.log(typeof initialJob?.id);
  }, [jobs, jobId, router]);

  const handleSelectedJob = (job: Job) => {
    setSelectedJob(job);
    const params = new URLSearchParams(window.location.search);
    params.set("jobId", job.id || "");
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };
  return (
    <main className="grid grid-cols-3 h-screen mx-14 gap-4 mb-3">
      <section className="flex flex-col gap-5 pr-2 overflow-y-scroll scrollbar-thin scrollbar-thumb">
        {jobs.map((job: Job) => (
          <div
            key={job.id}
            className="flex flex-col gap-4 border rounded-md p-6 cursor-pointer"
            onClick={() => handleSelectedJob(job)}
          >
            <span className="text-[#003366] font-bold text-xl">
              {job.title}
            </span>
            <span className="font-extralight">
              {truncateDescription(job.description, 10)}
            </span>
          </div>
        ))}
      </section>
      <div className=" col-span-2 overflow-y-auto scrollbar-thin scrollbar-thumb pr-2">
        <JobDetails selectedJob={selectedJob} />
      </div>
    </main>
  );
};
export default JobsList;
