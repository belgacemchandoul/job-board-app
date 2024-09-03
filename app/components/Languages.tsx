"use client";

import { SubmitHandler } from "react-hook-form";
import { useFormSubmit } from "../hooks/useFormSubmit";
import UserLanguagesForm, {
  userLanguagesFormType,
} from "./forms/UserLanguagesForm";
import { UserLanguagesProps } from "@/types/interfaces";

const LanguagesComponent: React.FC<UserLanguagesProps> = ({
  userLanguages,
}) => {
  const submitForm = useFormSubmit<userLanguagesFormType>();
  const onSubmit: SubmitHandler<userLanguagesFormType> = (data) => {
    return submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };
  return (
    <div className="min-h-screen flex flex-col items-center mt-7">
      <div className="font-medium text-2xl text-[#003366]">Languages</div>
      <UserLanguagesForm defaultValues={userLanguages} onSubmit={onSubmit} />
    </div>
  );
};

export default LanguagesComponent;
