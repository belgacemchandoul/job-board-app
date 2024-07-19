"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export type userCareerFormType = Pick<User, "work">;

const schema = yup.object().shape({
  work: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Skill is required"),
        startDate: yup.string().required("Skill is required"),
        endDate: yup.string().required("Skill is required"),
        job: yup.string().required("Skill is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<userCareerFormType>;
  defaultValues?: userCareerFormType;
}

const UserCareerForm: React.FC<JobFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isValid, errors },
    reset,
  } = useForm<userCareerFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      work: [
        {
          name: "",
          endDate: "",
          startDate: "",
          job: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "work",
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
              <label>Company</label>
              <input type="text" {...register(`work.${index}.name` as const)} />
              {errors.work?.[index]?.name && (
                <span>{errors.work[index]?.name?.message}</span>
              )}
            </div>
            <div>
              <label>Job Title</label>
              <input type="text" {...register(`work.${index}.job` as const)} />
              {errors.work?.[index]?.job && (
                <span>{errors.work[index]?.job?.message}</span>
              )}
            </div>
            <div>
              <label>Start Date</label>
              <input
                type="date"
                {...register(`work.${index}.startDate` as const)}
              />
              {errors.work?.[index]?.startDate && (
                <span>{errors.work[index]?.startDate?.message}</span>
              )}
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                {...register(`work.${index}.endDate` as const)}
              />
              {errors.work?.[index]?.endDate && (
                <span>{errors.work[index]?.endDate?.message}</span>
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
            append({ name: "", job: "", startDate: "", endDate: "" })
          }
        >
          Add Work
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

export default UserCareerForm;
