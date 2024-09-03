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
const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
export type userEducationFormType = Pick<User, "education">;

const schema = yup.object().shape({
  education: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Skill is required"),
        startDate: yup
          .string()
          .matches(dateRegex, "Start date must be in MM/YYYY format")
          .required("Skill is required"),
        endDate: yup
          .string()
          .matches(dateRegex, "End date must be in MM/YYYY format")
          .required("Skill is required")
          .test(
            "is-greater",
            "End date should be later than start date",
            function (value) {
              const { startDate } = this.parent;
              if (!startDate || !value) return true;
              const [startMonth, startYear] = startDate.split("/").map(Number);
              const [endMonth, endYear] = value.split("/").map(Number);
              return (
                endYear > startYear ||
                (endYear === startYear && endMonth >= startMonth)
              );
            }
          ),
        diploma: yup.string().required("Skill is required"),
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-8 transition duration-300 h-fit w-1/3"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 w-full">
          <div className="flex gap-4 items-center w-full">
            <label className="w-1/3 text-left">University</label>
            <Input
              type="text"
              register={register(`education.${index}.name` as const)}
            />
            {errors.education?.[index]?.name && (
              <span className="text-red-500">
                {errors.education[index]?.name?.message}
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center w-full">
            <label className="w-1/3 text-left">Diploma</label>
            <Input
              type="text"
              register={register(`education.${index}.diploma` as const)}
            />
            {errors.education?.[index]?.diploma && (
              <span className="text-red-500">
                {errors.education[index]?.diploma?.message}
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center w-full">
            <label className="w-1/3 text-left">Start Date</label>
            <Input
              type="date"
              register={register(`education.${index}.startDate` as const)}
            />
            {errors.education?.[index]?.startDate && (
              <span className="text-red-500">
                {errors.education[index]?.startDate?.message}
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center w-full">
            <label className="w-1/3 text-left">End Date</label>
            <Input
              type="date"
              register={register(`education.${index}.endDate` as const)}
            />
            {errors.education?.[index]?.endDate && (
              <span className="text-red-500">
                {errors.education[index]?.endDate?.message}
              </span>
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
        <AddButton
          onClick={() =>
            append({ name: "", diploma: "", startDate: "", endDate: "" })
          }
        />
        <SubmitButton
          isLoading={isSubmitting}
          disabled={!isDirty || !isValid}
        />
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default UserEducationForm;
