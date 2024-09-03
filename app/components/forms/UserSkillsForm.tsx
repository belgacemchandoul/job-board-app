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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-8 transition duration-300 h-fit w-1/3"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-3 w-full">
          <div className="flex gap-4 items-center w-full">
            <label className="w-1/3 text-left">Skill</label>
            <Input
              type="text"
              register={register(`skills.${index}.name` as const)}
            />
            {errors.skills?.[index]?.name && (
              <span className="text-red-500">
                {errors.skills[index]?.name?.message}
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
        <AddButton onClick={() => append({ name: "" })} />
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

export default UserSkillsForm;
