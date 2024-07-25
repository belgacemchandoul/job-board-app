import axios from "axios";
import JobCard from "./JobCard";
import { Job } from "@/types/Job";
import truncateDescription from "../utils/truncateDescription";
const JobsHomePageSection = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/api`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch jobs");
  }
  const jobsData: Job[] = response.data;
  const latestJobs = jobsData.slice(0, 3);
  return (
    <section className="grid grid-cols-3 gap-12">
      {latestJobs.map((jobData) => (
        <JobCard
          key={jobData.id}
          title={jobData.title}
          jobLink={jobData.id || ""}
          description={truncateDescription(jobData.description, 6)}
        />
      ))}
    </section>
  );
};

export default JobsHomePageSection;
