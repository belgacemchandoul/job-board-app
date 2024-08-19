"use client";
import UserInfosForm, {
  userInfoFormType,
} from "@/app/components/forms/UserInfosForm";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";

interface BasicInformationProps {
  userData: userInfoFormType;
}

const BasicInformationComponent: React.FC<BasicInformationProps> = ({
  userData,
}) => {
  const onSubmit: SubmitHandler<userInfoFormType> = async (data) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/api`,
        data
      );
      console.log("data submitted successfully", res);
    } catch (error) {
      console.log("error updating data", error);
    }
  };

  return <UserInfosForm onSubmit={onSubmit} defaultValues={userData} />;
};

export default BasicInformationComponent;
