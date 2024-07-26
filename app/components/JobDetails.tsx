import { Job } from "@/types/Job";

interface JobsList {
  selectedJob: Job | null;
}
const JobDetails: React.FC<JobsList> = ({ selectedJob }) => {
  return (
    <section className="border">
      <div>{selectedJob?.title}</div>
      <div>{selectedJob?.description}</div>
      {/* <div className="border flex-1">{selectedJob?.}</div> */}
    </section>
  );
};

export default JobDetails;
