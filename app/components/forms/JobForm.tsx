"use client";

import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Job } from "@/types/Job";
import Input from "../Input";
import DeleteButton from "./FormDeleteButton";
import AddButton from "./FormAddButton";
import SubmitButton from "./FormSubmitButton";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.boolean().required("Status is required"),
  missions: yup
    .array()
    .of(
      yup.object().shape({
        mission: yup.string().required("Mission is required"),
      })
    )
    .required(),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        skill: yup.string().required("Skill is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<Job>;
  defaultValues?: Job;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, isSubmitted, errors, isValid },
    reset,
  } = useForm<Job>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      status: false,
      missions: [{ mission: "" }],
      skills: [{ skill: "" }],
    },
  });

  const {
    fields: missionFields,
    append: appendMission,
    remove: removeMission,
  } = useFieldArray({
    name: "missions",
    control,
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    name: "skills",
    control,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center gap-5 bg-white shadow-md rounded-md p-4 sm:p-6 md:p-8 w-full max-w-lg"
    >
      <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
        <label className="w-full sm:w-1/3 text-left">Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full sm:w-2/3 border-gray-300 rounded-md"
            />
          )}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
        <label className="w-full sm:w-1/3 text-left">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full sm:w-2/3 border-gray-300 rounded-md p-2"
            />
          )}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
        <label className="w-full sm:w-1/3 text-left">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={field.onChange}
              className="w-5 h-5"
            />
          )}
        />
        {errors.status && (
          <span className="text-red-500 text-sm">{errors.status.message}</span>
        )}
      </div>

      <div className="flex gap-2 items-center w-full">
        <label className="w-full sm:w-1/3 text-left">Missions</label>
        {missionFields.map((field, index) => (
          <div key={field.id} className="w-full flex gap-2 items-center">
            <Input
              type="text"
              register={register(`missions.${index}.mission` as const)}
              className="w-full border-gray-300 rounded-md"
            />
            {index > 0 && <DeleteButton onClick={() => removeMission(index)} />}
          </div>
        ))}
        <AddButton onClick={() => appendMission({ mission: "" })} />
        {errors.missions && errors.missions[0]?.mission && (
          <span className="text-red-500 text-sm">
            {errors.missions[0].mission?.message}
          </span>
        )}
      </div>

      <div className="flex gap-2 items-center w-full">
        <label className="w-full sm:w-1/3 text-left">Skills</label>
        {skillFields.map((field, index) => (
          <div
            key={field.id}
            className="w-full flex flex-col gap-2 items-center"
          >
            <Input
              type="text"
              register={register(`skills.${index}.skill` as const)}
              className="w-full border-gray-300 rounded-md"
            />
            {index > 0 && <DeleteButton onClick={() => removeSkill(index)} />}
          </div>
        ))}
        <AddButton onClick={() => appendSkill({ skill: "" })} />
        {errors.skills && errors.skills[0]?.skill && (
          <span className="text-red-500 text-sm">
            {errors.skills[0].skill?.message}
          </span>
        )}
      </div>

      <div className="flex gap-2 justify-end w-full">
        <SubmitButton
          isLoading={isSubmitting}
          disabled={isSubmitting || !isDirty || isSubmitted || !isValid}
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
    </form>
  );
};

export default JobForm;
