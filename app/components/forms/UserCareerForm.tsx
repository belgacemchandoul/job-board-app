"use client";

import { User } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../Input";
import SubmitButton from "./FormSubmitButton";
import DeleteButton from "./FormDeleteButton";
import AddButton from "./FormAddButton";

export type userCareerFormType = Pick<User, "work">;

const schema = yup.object().shape({
  work: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Company name is required"),
        startDate: yup.string().required("Start date is required"),
        endDate: yup
          .string()
          .required("End date is required")
          .test(
            "is-greater",
            "End date should be later than start date",
            function (value) {
              const { startDate } = this.parent;
              if (!startDate || !value) return true;
              const start = new Date(startDate);
              const end = new Date(value);
              return end >= start;
            }
          ),
        job: yup.string().required("Job title is required"),
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
    formState: { isDirty, isSubmitting, isSubmitted, errors },
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-4 sm:p-6 md:p-8 w-[85%] max-w-lg"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">Company</label>
            <Input
              type="text"
              register={register(`work.${index}.name` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.work?.[index]?.name && (
            <span className="text-red-500">
              {errors.work[index]?.name?.message}
            </span>
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">Job Title</label>
            <Input
              type="text"
              register={register(`work.${index}.job` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.work?.[index]?.job && (
            <span className="text-red-500">
              {errors.work[index]?.job?.message}
            </span>
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">Start Date</label>
            <Input
              type="date"
              register={register(`work.${index}.startDate` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.work?.[index]?.startDate && (
            <span className="text-red-500">
              {errors.work[index]?.startDate?.message}
            </span>
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">End Date</label>
            <Input
              type="date"
              register={register(`work.${index}.endDate` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.work?.[index]?.endDate && (
            <span className="text-red-500">
              {errors.work[index]?.endDate?.message}
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
        <AddButton
          onClick={() =>
            append({ name: "", job: "", startDate: "", endDate: "" })
          }
        />
        <div className="flex gap-2">
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
        </div>
      </div>
    </form>
  );
};

export default UserCareerForm;
