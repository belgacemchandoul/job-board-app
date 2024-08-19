"use client";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import UserEducationForm, {
  userEducationFormType,
} from "@/app/components/forms/UserEducationForm";
const Languages = () => {
  const onSubmit: SubmitHandler<userEducationFormType> = async (data) => {
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
      <UserEducationForm onSubmit={onSubmit} />{" "}
    </div>
  );
};

export default Languages;
