"use client";

import { SubmitHandler } from "react-hook-form";
import { useFormSubmit } from "../hooks/useFormSubmit";
import UserCareerForm, { userCareerFormType } from "./forms/UserCareerForm";
import { UserCareerProps } from "@/types/interfaces";

const WorkComponent: React.FC<UserCareerProps> = ({ userWork }) => {
  const submitForm = useFormSubmit<userCareerFormType>();
  const onSubmit: SubmitHandler<userCareerFormType> = (data) => {
    return submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };
  return (
    <div className="min-h-screen flex flex-col items-center mt-7">
      <div className="font-medium text-2xl text-[#003366]">Work Experience</div>
      <UserCareerForm defaultValues={userWork} onSubmit={onSubmit} />
    </div>
  );
};

export default WorkComponent;
