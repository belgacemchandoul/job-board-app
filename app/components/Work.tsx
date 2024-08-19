"use client";

import { SubmitHandler } from "react-hook-form";
import { useFormSubmit } from "../hooks/useFormSubmit";
import UserCareerForm, { userCareerFormType } from "./forms/UserCareerForm";
import { UserCareerProps } from "@/types/interfaces";

const WorkComponent: React.FC<UserCareerProps> = ({ userWork }) => {
  const submitForm = useFormSubmit<userCareerFormType>();
  const onSubmit: SubmitHandler<userCareerFormType> = (data) => {
    submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };
  return <UserCareerForm defaultValues={userWork} onSubmit={onSubmit} />;
};

export default WorkComponent;
