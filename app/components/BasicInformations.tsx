"use client";
import UserInfosForm, {
  userInfoFormType,
} from "@/app/components/forms/UserInfosForm";
import { SubmitHandler } from "react-hook-form";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { BasicInformationProps } from "@/types/interfaces";

const BasicInformationComponent: React.FC<BasicInformationProps> = ({
  userData,
}) => {
  const submitForm = useFormSubmit<userInfoFormType>();
  const onSubmit: SubmitHandler<userInfoFormType> = (data) => {
    submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };

  return (
    <div className="min-h-screen flex justify-center">
      <UserInfosForm onSubmit={onSubmit} defaultValues={userData} />
    </div>
  );
};

export default BasicInformationComponent;
