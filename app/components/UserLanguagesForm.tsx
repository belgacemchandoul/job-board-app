"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export type userLanguagesFormType = Pick<User, "languages">;

const schema = yup.object().shape({
  languages: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Skill is required"),
        level: yup.string().required("Level is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<userLanguagesFormType>;
  defaultValues?: userLanguagesFormType;
}

const UserInfosForm: React.FC<JobFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isValid, errors },
    reset,
  } = useForm<userLanguagesFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      languages: [
        {
          name: "",
          level: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "languages",
    control,
  });
  useEffect(() => {
    if (isSubmitting) {
      console.log("Form is submitting...");
    }
  }, [isSubmitting]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div>
              <label>Skill</label>
              <input
                type="text"
                {...register(`languages.${index}.name` as const)}
              />
              {errors.languages?.[index]?.name && (
                <span>{errors.languages[index]?.name?.message}</span>
              )}
            </div>
            <div>
              <label>Level</label>
              <input
                type="text"
                {...register(`languages.${index}.level` as const)}
              />
              {errors.languages?.[index]?.level && (
                <span>{errors.languages[index]?.level?.message}</span>
              )}
            </div>
            {index > 0 && (
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append({ name: "", level: "" })}>
          Add Language
        </button>
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
