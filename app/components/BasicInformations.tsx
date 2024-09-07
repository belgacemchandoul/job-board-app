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
    return submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };

  return (
    <div className="flex flex-col items-center mt-7 gap-3 w-full px-4 sm:px-8">
      <div className="font-medium text-2xl text-[#003366] text-center">
        Basic Information
      </div>
      <UserInfosForm onSubmit={onSubmit} defaultValues={userData} />
    </div>
  );
};

export default BasicInformationComponent;
