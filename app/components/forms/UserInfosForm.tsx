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
    formState: { isDirty, isSubmitting, isSubmitted, errors },
    reset,
  } = useForm<userInfoFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { email: "", name: "", birthdate: "" },
  });
  useEffect(() => {
    console.log("isSubmitting:", isSubmitting);
  }, [isSubmitting]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-4 sm:p-8 transition duration-300 w-[85%] max-w-lg"
    >
      <div className="flex gap-2 items-center w-full flex-col sm:flex-row">
        <label className="w-full sm:w-1/3 text-left">Email</label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => <Input {...field} disabled />}
        />
      </div>

      <div className="flex gap-2 items-center w-full flex-col sm:flex-row">
        <label className="w-full md:w-1/3 text-left">Name</label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => <Input {...field} />}
        />
      </div>
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}

      <div className="flex gap-2 items-center w-full flex-col sm:flex-row">
        <label className="w-full sm:w-1/3 text-left">Birthdate</label>
        <Controller
          control={control}
          name="birthdate"
          render={({ field }) => <Input type="date" {...field} />}
        />
      </div>
      {errors.birthdate && (
        <span className="text-red-500">{errors.birthdate.message}</span>
      )}

      <section className="flex gap-4 justify-center w-full">
        <SubmitButton
          isLoading={isSubmitting}
          disabled={isSubmitting || !isDirty || isSubmitted}
          isSubmitted={isSubmitted}
        />
        <button
          type="button"
          onClick={() => reset()}
          className="text-sm underline"
        >
          Reset
        </button>
      </section>
    </form>
  );
};

export default UserInfosForm;
