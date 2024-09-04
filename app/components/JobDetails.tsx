"use client";
import { Job } from "@/types/Job";
import JobDetailsComponent from "./JobDetailsComponent";
import onJobApply from "../utils/jobApply";

interface JobsList {
  selectedJob: Job | null;
}

const JobDetails: React.FC<JobsList> = ({ selectedJob }) => {
  const handleApply = async () => {
    await onJobApply({ params: { jobId: selectedJob?.id || "" } });
  };

  return (
    selectedJob && (
      <div className="border p-3 rounded-md ">
        {" "}
        <JobDetailsComponent job={selectedJob} onApply={handleApply} />
      </div>
    )
  );
};

export default JobDetails;
