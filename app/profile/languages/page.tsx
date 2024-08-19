"use client";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import UserLanguagesForm, {
  userLanguagesFormType,
} from "@/app/components/forms/UserLanguagesForm";
const Languages = () => {
  const onSubmit: SubmitHandler<userLanguagesFormType> = async (data) => {
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
      <UserLanguagesForm onSubmit={onSubmit} />{" "}
    </div>
  );
};

export default Languages;
