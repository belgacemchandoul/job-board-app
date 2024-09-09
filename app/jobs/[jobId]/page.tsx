import JobDetailsComponent from "@/app/components/JobDetailsComponent";
import onJobApply from "@/app/utils/jobApply";
import { Job } from "@/types/Job";
import axios from "axios";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.jobId}/api/?jobId=${params.jobId}`
  );
  const jobDetails: Job = response.data;

  return (
    <div className="min-h-screen flex flex-col gap-4 mx-4 mt-6">
      <JobDetailsComponent
        job={jobDetails}
        onApply={() => onJobApply({ params: { jobId: params.jobId } })}
      />
    </div>
  );
};

export default JobDetailsPage;
