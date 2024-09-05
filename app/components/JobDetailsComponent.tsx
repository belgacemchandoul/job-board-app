"use client";
import { Job } from "@/types/Job";
import Button from "./Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface JobDetailsProps {
  job: Job;
  onApply?: () => Promise<any>;
}

const JobDetailsComponent: React.FC<JobDetailsProps> = ({ job, onApply }) => {
  const toastJobId: string = "hello";
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleApplyClick = async () => {
    if (status === "loading") return;
    if (!session) {
      toast.error("You need to sign in first.", { id: toastJobId });
      signIn();
    } else if (onApply) {
      toast.loading("Applying for job...", { id: toastJobId });
      try {
        await onApply();
        toast.success("Application successful!", { id: toastJobId });
        router.replace("/profile/applied-jobs");
        router.refresh();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            toast.error("You have already applied for this job.", {
              id: toastJobId,
            });
          } else {
            toast.error(
              error.message || "Application failed. Please try again.",
              {
                id: toastJobId,
              }
            );
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <div className="font-medium text-lg lg:text-xl text-[#003366]">
          {job?.title}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-600 font-semibold">Job description:</span>
          <div className="text-sm lg:text-base">{job?.description}</div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-600 font-semibold">Your missions:</span>
          <ul className="text-sm lg:text-base">
            {job?.missions.map((mission, index) => (
              <li key={index}>- {mission.mission}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-600 font-semibold">Required skills:</span>
          <ul className="text-sm lg:text-base">
            {job?.skills.map((skill, index) => (
              <li key={index}>- {skill.skill}</li>
            ))}
          </ul>
        </div>
      </section>
      <Button text="Apply" onClick={handleApplyClick} />
    </div>
  );
};

export default JobDetailsComponent;
