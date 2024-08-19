"use client";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import UserCareerForm, {
  userCareerFormType,
} from "@/app/components/forms/UserCareerForm";
const Languages = () => {
  const onSubmit: SubmitHandler<userCareerFormType> = async (data) => {
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
  return (
    <div>
      {" "}
      <UserCareerForm onSubmit={onSubmit} />{" "}
    </div>
  );
};

export default Languages;
