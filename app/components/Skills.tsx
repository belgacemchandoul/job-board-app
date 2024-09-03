"use client";

import { SubmitHandler } from "react-hook-form";
import UserSkillsForm, { userSkillsFormType } from "./forms/UserSkillsForm";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { UserSkillsProps } from "@/types/interfaces";

const SkillsComponent: React.FC<UserSkillsProps> = ({ userSkills }) => {
  const submitForm = useFormSubmit<userSkillsFormType>();
  const onSubmit: SubmitHandler<userSkillsFormType> = (data) => {
    submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };
  return (
    <div className="min-h-screen flex flex-col items-center mt-7">
      <div className="font-medium text-2xl text-[#003366]">Skills</div>
      <UserSkillsForm defaultValues={userSkills} onSubmit={onSubmit} />
    </div>
  );
};

export default SkillsComponent;
