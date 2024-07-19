"use client";
import { SubmitHandler } from "react-hook-form";
import JobForm from "../components/forms/JobForm";
import axios from "axios";
import { Job } from "@/types/Job";

const onSubmit: SubmitHandler<Job> = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/api`,
      data
    );
    console.log("data submitted successfully", res);
  } catch (error) {
    console.log("error creating job", error);
  }
};

const Admin = () => {
  return <JobForm onSubmit={onSubmit} />;
};

export default Admin;
