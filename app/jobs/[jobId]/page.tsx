import { Job } from "@/types/Job";
import axios from "axios";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.jobId}/api/?jobId=${params.jobId}`
  );
  const jobDetails: Job = response.data;
  return (
    <div className="min-h-screen flex flex-col gap-4 mx-4 mt-6">
      <div className="font-medium text-2xl text-[#003366]">
        {jobDetails.title}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-600 font-semibold ">Job description:</span>
        <div>{jobDetails.description}</div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-600 font-semibold ">Your missions:</span>
        <ul>
          {jobDetails.missions.map((mission, index) => (
            <li key={index}>- {mission.mission}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-600 font-semibold ">Required skills:</span>
        <ul>
          {jobDetails.skills.map((skill, index) => (
            <li key={index}>- {skill.skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetailsPage;
