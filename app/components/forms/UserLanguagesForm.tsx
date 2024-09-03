"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../Input";
import DeleteButton from "./FormDeleteButton";
import AddButton from "./FormAddButton";
import SubmitButton from "./FormSubmitButton";

export type userLanguagesFormType = {
  languages: {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced";
  }[];
};

const schema = yup.object().shape({
  languages: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Language is required"),
        level: yup
          .string()
          .oneOf(["Beginner", "Intermediate", "Advanced"], "Level is required")
          .required("Level is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<userLanguagesFormType>;
  defaultValues?: userLanguagesFormType;
}

const UserLanguagesForm: React.FC<JobFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isSubmitted, errors },
    reset,
  } = useForm<userLanguagesFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      languages: [
        {
          name: "",
          level: "Beginner",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "languages",
    control,
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-8 transition duration-300 h-fit w-1/3"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 w-full">
          <div className="flex gap-2 items-center w-full flex-col">
            <div className="flex gap-4 items-center w-full">
              <label className="w-1/3 text-left">Language</label>
              <Input
                type="text"
                register={register(`languages.${index}.name` as const)}
              />
            </div>
            {errors.languages?.[index]?.name && (
              <span className="text-red-500">
                {errors.languages[index]?.name?.message}
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center w-full flex-col">
            <div className="flex gap-4 items-center w-full">
              <label className="w-1/3 text-left">Level</label>
              <select
                {...register(`languages.${index}.level` as const)}
                className="outline-none p-2 border rounded-md shadow-sm w-full cursor-pointer"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            {errors.languages?.[index]?.level && (
              <span>{errors.languages[index]?.level?.message}</span>
            )}
          </div>
          <div className="flex items-center justify-center">
            {index > 0 && <DeleteButton onClick={() => remove(index)} />}
          </div>
          <hr />
        </div>
      ))}
      <div className="flex gap-2">
        {" "}
        <AddButton onClick={() => append({ name: "", level: "Beginner" })} />
        <SubmitButton
          isLoading={isSubmitting}
          disabled={isSubmitting || !isDirty || isSubmitted}
          isSubmitted={isSubmitted}
        />
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default UserLanguagesForm;
