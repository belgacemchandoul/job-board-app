"use client";
import { Job } from "@/types/Job";
import Button from "./Button";
import onJobApply from "../utils/jobApply";
import { redirect, useRouter } from "next/navigation";
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
      <section>
        <div>{selectedJob?.title}</div>
        <div>{selectedJob?.description}</div>
        <div>
          {selectedJob?.missions.map((mission, index) => {
            return <p key={index}>{mission.mission}</p>;
          })}
        </div>
        <div>
          {selectedJob?.skills.map((skill, index) => {
            return <p key={index}>{skill.skill}</p>;
          })}
        </div>
      </section>
      <Button text="Apply" onClick={() => handleApplyClick()} />
    </div>
  );
};

export default JobDetails;
