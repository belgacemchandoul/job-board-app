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

export type userEducationFormType = Pick<User, "education">;

const schema = yup.object().shape({
  education: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("University name is required"),
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
        diploma: yup.string().required("Diploma is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<userEducationFormType>;
  defaultValues?: userEducationFormType;
}

const UserEducationForm: React.FC<JobFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isSubmitted, errors },
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-4 sm:p-6 md:p-8 w-[85%] max-w-lg"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">University</label>
            <Input
              type="text"
              register={register(`education.${index}.name` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.education?.[index]?.name && (
            <span className="text-red-500">
              {errors.education[index]?.name?.message}
            </span>
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">Diploma</label>
            <Input
              type="text"
              register={register(`education.${index}.diploma` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.education?.[index]?.diploma && (
            <span className="text-red-500">
              {errors.education[index]?.diploma?.message}
            </span>
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">Start Date</label>
            <Input
              type="date"
              register={register(`education.${index}.startDate` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.education?.[index]?.startDate && (
            <span className="text-red-500">
              {errors.education[index]?.startDate?.message}
            </span>
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <label className="w-full sm:w-1/3 text-left">End Date</label>
            <Input
              type="date"
              register={register(`education.${index}.endDate` as const)}
              className="w-full sm:w-2/3"
            />
          </div>
          {errors.education?.[index]?.endDate && (
            <span className="text-red-500">
              {errors.education[index]?.endDate?.message}
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
        <AddButton
          onClick={() =>
            append({ name: "", diploma: "", startDate: "", endDate: "" })
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

export default UserEducationForm;
