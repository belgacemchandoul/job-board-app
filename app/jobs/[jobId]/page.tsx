import { Job } from "@/types/Job";
import axios from "axios";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.jobId}/api/?jobId=${params.jobId}`
  );
  const jobDetails: Job = response.data;
  console.log(jobDetails);
  return <div className="h-screen">{jobDetails.description}</div>;
};

export default JobDetailsPage;
