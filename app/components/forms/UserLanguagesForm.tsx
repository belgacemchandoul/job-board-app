"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

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
        name: yup.string().required("Skill is required"),
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
    formState: { isDirty, isSubmitting, isValid, errors },
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
              <select {...register(`languages.${index}.level` as const)}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
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
        <button
          type="button"
          onClick={() => append({ name: "", level: "Beginner" })}
        >
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

export default UserLanguagesForm;
