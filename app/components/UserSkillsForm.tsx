"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

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

const UserInfosForm: React.FC<JobFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isValid, errors },
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
                {...register(`skills.${index}.name` as const)}
              />
              {errors.skills?.[index]?.name && (
                <span>{errors.skills[index]?.name?.message}</span>
              )}
            </div>
            {index > 0 && (
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append({ name: "" })}>
          Add Skill
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
