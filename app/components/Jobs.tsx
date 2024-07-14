import { Job } from "@/types/job";
import axios from "axios";

const JobsList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/api`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch jobs");
  }
  const jobsData = response.data;

  return (
    <div>
      {jobsData.map((job: Job) => (
        <div key={job.id}>
          <p>{job.title}</p>
        </div>
      ))}
    </div>
  );
};
export default JobsList;
