"use client";
import { Job } from "@/types/Job";
import Button from "./Button";
import onJobApply from "../utils/jobApply";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface JobsList {
  selectedJob: Job | null;
}

const JobDetails: React.FC<JobsList> = ({ selectedJob }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleApplyClick = async () => {
    if (status === "loading") return;
    if (!session) {
      signIn();
    } else {
      await onJobApply({ params: { jobId: selectedJob?.id || "" } });
      router.push("/profile/applied-jobs");
    }
  };
  return (
    <div className="border p-3 rounded-md flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <div className="font-medium text-xl text-[#003366]">
          {selectedJob?.title}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-600 font-semibold ">Job description:</span>
          <div>{selectedJob?.description}</div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-600 font-semibold ">Your missions:</span>
          <ul>
            {selectedJob?.missions.map((mission, index) => (
              <li key={index}>- {mission.mission}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-600 font-semibold ">Required skills:</span>
          <ul>
            {selectedJob?.skills.map((skill, index) => (
              <li key={index}>- {skill.skill}</li>
            ))}
          </ul>
        </div>
      </section>
      <Button text="Apply" onClick={() => handleApplyClick()} />
    </div>
  );
};

export default JobDetails;
