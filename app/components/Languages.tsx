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
    submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };
  return (
    <UserLanguagesForm defaultValues={userLanguages} onSubmit={onSubmit} />
  );
};

export default LanguagesComponent;
