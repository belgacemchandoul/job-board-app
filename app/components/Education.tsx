"use client";

import { SubmitHandler } from "react-hook-form";
import { useFormSubmit } from "../hooks/useFormSubmit";
import UserEducationForm, {
  userEducationFormType,
} from "./forms/UserEducationForm";
import { UserEducationProps } from "@/types/interfaces";

const EducationComponent: React.FC<UserEducationProps> = ({
  userEducation,
}) => {
  const submitForm = useFormSubmit<userEducationFormType>();
  const onSubmit: SubmitHandler<userEducationFormType> = (data) => {
    submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };
  return (
    <UserEducationForm defaultValues={userEducation} onSubmit={onSubmit} />
  );
};

export default EducationComponent;
