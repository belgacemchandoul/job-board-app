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
  return <UserSkillsForm defaultValues={userSkills} onSubmit={onSubmit} />;
};

export default SkillsComponent;
