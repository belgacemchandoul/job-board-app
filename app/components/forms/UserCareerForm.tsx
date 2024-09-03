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
  console.log(defaultValues);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-8 transition duration-300 h-fit w-1/3"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 w-full">
          <div className="flex gap-4 items-center w-full">
            <label className="w-1/3 text-left">Company</label>
            <Input
              type="text"
              register={register(`work.${index}.name` as const)}
            />
            {errors.work?.[index]?.name && (
              <span className="text-red-500">
                {errors.work[index]?.name?.message}
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center w-full">
            <label className="w-1/3 text-left">Job Title</label>
            <Input
              type="text"
              register={register(`work.${index}.job` as const)}
            />
            {errors.work?.[index]?.job && (
              <span className="text-red-500">
                {errors.work[index]?.job?.message}
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center w-full">
            <label className="w-2/3 text-left">Start Date</label>
            <Input
              type="date"
              register={register(`work.${index}.startDate` as const)}
            />
            {errors.work?.[index]?.startDate && (
              <span className="text-red-500">
                {errors.work[index]?.startDate?.message}
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center w-full">
            <label className="w-2/3 text-left">End Date</label>
            <Input
              type="date"
              register={register(`work.${index}.endDate` as const)}
            />
            {errors.work?.[index]?.endDate && (
              <span className="text-red-500">
                {errors.work[index]?.endDate?.message}
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
            append({ name: "", job: "", startDate: "", endDate: "" })
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

export default UserCareerForm;
