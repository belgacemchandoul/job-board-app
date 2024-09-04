import axios from "axios";
import JobsList from "../components/JobsList";
import { Job } from "@/types/Job";

const Jobs = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/api`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch jobs");
  }
  const jobsData: Job[] = response.data;
  return (
    <div className="w-full overflow-hidden mt-10">
      <JobsList jobs={jobsData} />
    </div>
  );
};

export default Jobs;
