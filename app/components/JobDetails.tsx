import { Job } from "@/types/Job";
import JobDetailsComponent from "./JobDetailsComponent";

interface JobsList {
  selectedJob: Job | null;
}

const JobDetails: React.FC<JobsList> = ({ selectedJob }) => {
  return (
    selectedJob && (
      <div className="md:border md:p-3 rounded-md ">
        {" "}
        <JobDetailsComponent job={selectedJob} />
      </div>
    )
  );
};

export default JobDetails;
