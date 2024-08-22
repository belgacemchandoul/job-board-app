"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../Input";
import SubmitButton from "./FormSubmitButton";

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
    formState: { isDirty, isSubmitting, isValid, errors },
    reset,
  } = useForm<userInfoFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { email: "", name: "", birthdate: "" },
  });
  useEffect(() => {
    if (isSubmitting) {
      console.log(isSubmitting, "Form is submitting...");
    }
  }, [isSubmitting]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-8 transition duration-300 h-fit w-1/3"
    >
      <div className="flex gap-4 items-center w-full">
        <label className="w-1/3 text-left">Email</label>
        <div className="w-2/3">
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input {...field} />}
          />
        </div>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex gap-4 items-center w-full">
        <label className="w-1/3 text-left">Name</label>
        <div className="w-2/3">
          <Controller
            control={control}
            name="name"
            render={({ field }) => <Input {...field} />}
          />
        </div>
      </div>
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}
      <div className="flex gap-4 items-center w-full">
        <label className="w-1/3 text-left">Birthdate</label>
        <div className="w-2/3">
          <Controller
            control={control}
            name="birthdate"
            render={({ field }) => <Input type="date" {...field} />}
          />
        </div>
        {errors.birthdate && (
          <span className="text-red-500">{errors.birthdate.message}</span>
        )}
      </div>
      <section className="flex gap-4">
        <SubmitButton
          isLoading={isSubmitting}
          disabled={!isDirty || !isValid}
        />
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </section>
    </form>
  );
};

export default UserInfosForm;
