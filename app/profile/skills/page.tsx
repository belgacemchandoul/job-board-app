"use client";

import axios from "axios";
import UserSkillsForm, {
  userSkillsFormType,
} from "../../components/forms/UserSkillsForm";
import { SubmitHandler } from "react-hook-form";
const Skills = () => {
  const onSubmit: SubmitHandler<userSkillsFormType> = async (data) => {
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
      <UserSkillsForm onSubmit={onSubmit} />{" "}
    </div>
  );
};

export default Skills;
