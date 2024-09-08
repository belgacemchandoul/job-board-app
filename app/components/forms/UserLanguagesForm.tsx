"use client";

import { yupResolver } from "@hookform/resolvers/yup";
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
    formState: { isDirty, isSubmitting, isSubmitted, errors, isValid },
    reset,
  } = useForm<userLanguagesFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      languages:
        defaultValues?.languages && defaultValues.languages.length > 0
          ? defaultValues.languages
          : [{ name: "", level: "Beginner" }],
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
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-4 sm:p-6 md:p-8 w-[85%] max-w-lg"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">Language</label>
            <Input
              type="text"
              register={register(`languages.${index}.name` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.languages?.[index]?.name && (
            <span className="text-red-500">
              {errors.languages[index]?.name?.message}
            </span>
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">Level</label>
            <select
              {...register(`languages.${index}.level` as const)}
              className="outline-none p-2 border rounded-md shadow-sm w-full sm:w-2/3 cursor-pointer"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          {errors.languages?.[index]?.level && (
            <span className="text-red-500">
              {errors.languages[index]?.level?.message}
            </span>
          )}
          {index > 0 && (
            <div className="flex justify-end">
              <DeleteButton onClick={() => remove(index)} />
            </div>
          )}
          <hr className="my-4" />
        </div>
      ))}
      <div className="flex gap-2 w-full justify-between">
        <AddButton onClick={() => append({ name: "", level: "Beginner" })} />
        <div className="flex gap-2">
          <SubmitButton
            isLoading={isSubmitting}
            disabled={isSubmitting || !isDirty || isSubmitted || !isValid}
            isSubmitted={isSubmitted}
          />
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm underline"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserLanguagesForm;
