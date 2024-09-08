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

export type userSkillsFormType = Pick<User, "skills">;

const schema = yup.object().shape({
  skills: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Skill is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<userSkillsFormType>;
  defaultValues?: userSkillsFormType;
}

const UserSkillsForm: React.FC<JobFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isSubmitted, errors, isValid },
    reset,
  } = useForm<userSkillsFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      skills: [
        {
          name: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "skills",
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
            <label className="w-full sm:w-1/3 text-left">Skill</label>
            <Input
              type="text"
              register={register(`skills.${index}.name` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.skills?.[index]?.name && (
            <span className="text-red-500">
              {errors.skills[index]?.name?.message}
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
      <div className="flex  gap-2 w-full justify-between">
        <AddButton onClick={() => append({ name: "" })} />
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

export default UserSkillsForm;
