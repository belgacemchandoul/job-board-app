"use client";
import { SubmitHandler } from "react-hook-form";
import JobForm from "../components/forms/JobForm";
import axios, { AxiosError } from "axios";
import { Job } from "@/types/Job";
import toast from "react-hot-toast";

const onSubmit: SubmitHandler<Job> = async (data) => {
  const toastJobId = "job-submit-toast";
  toast.loading("Submitting job...", { id: toastJobId });

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/api`,
      data
    );

    if (response.status === 201) {
      toast.success("Job submitted successfully!", { id: toastJobId });
    } else {
      toast.error(`Unexpected response: ${response.status}`, {
        id: toastJobId,
      });
    }
  } catch (error: any) {
    if (error instanceof AxiosError) {
      toast.error(
        `Failed to submit job: ${
          error.response?.data?.message || error.message
        }`,
        { id: toastJobId }
      );
    } else {
      toast.error(`Failed to submit job: ${error.message || "Unknown error"}`, {
        id: toastJobId,
      });
    }
  }
};

const Admin = () => {
  // return <JobForm onSubmit={onSubmit} />;
  return (
    <div className="font-bold text-6xl flex items-center justify-center mt-20">
      Disabled due to security matters
    </div>
  );
};

export default Admin;
