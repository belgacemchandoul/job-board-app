"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export type userInfoFormType = Pick<User, "name" | "email" | "birthdate">;

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  name: yup.string().required("Name is required"),
  birthdate: yup.string().required("Birth date is required"),
});

interface JobFormProps {
  onSubmit: SubmitHandler<userInfoFormType>;
  defaultValues?: userInfoFormType;
}

const UserInfosForm: React.FC<JobFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isValid, errors },
    reset,
  } = useForm<userInfoFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { email: "", name: "", birthdate: "" },
  });
  useEffect(() => {
    if (isSubmitting) {
      console.log("Form is submitting...");
    }
  }, [isSubmitting]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label>Email</label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => <input {...field} />}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Name</label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => <input {...field} />}
        />
      </div>
      {errors.name && <span>{errors.name.message}</span>}
      <div>
        <label>Birthdate</label>
        <Controller
          control={control}
          name="birthdate"
          render={({ field }) => <input {...field} />}
        />
        {errors.birthdate && <span>{errors.birthdate.message}</span>}
      </div>

      <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
        Submit
      </button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
};

export default UserInfosForm;
