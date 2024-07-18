"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export type userEducationFormType = Pick<User, "education">;

const schema = yup.object().shape({
  education: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Skill is required"),
        startDate: yup.string().required("Skill is required"),
        endDate: yup.string().required("Skill is required"),
        diploma: yup.string().required("Skill is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<userEducationFormType>;
  defaultValues?: userEducationFormType;
}

const UserInfosForm: React.FC<JobFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isValid, errors },
    reset,
  } = useForm<userEducationFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      education: [
        {
          name: "",
          endDate: "",
          startDate: "",
          diploma: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "education",
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
              <label>University</label>
              <input
                type="text"
                {...register(`education.${index}.name` as const)}
              />
              {errors.education?.[index]?.name && (
                <span>{errors.education[index]?.name?.message}</span>
              )}
            </div>
            <div>
              <label>Diploma</label>
              <input
                type="text"
                {...register(`education.${index}.diploma` as const)}
              />
              {errors.education?.[index]?.diploma && (
                <span>{errors.education[index]?.diploma?.message}</span>
              )}
            </div>
            <div>
              <label>Start Date</label>
              <input
                type="date"
                {...register(`education.${index}.startDate` as const)}
              />
              {errors.education?.[index]?.startDate && (
                <span>{errors.education[index]?.startDate?.message}</span>
              )}
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                {...register(`education.${index}.endDate` as const)}
              />
              {errors.education?.[index]?.endDate && (
                <span>{errors.education[index]?.endDate?.message}</span>
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
          onClick={() =>
            append({ name: "", diploma: "", startDate: "", endDate: "" })
          }
        >
          Add Education
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
