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
import { DevTool } from "@hookform/devtools";
import { Job } from "@/types/Job";
import { useEffect } from "react";

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
    formState: { errors, isDirty, isValid, isSubmitting },
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
  const onError = (errors: FieldErrors<Job>) => {
    console.log("Form errors:", errors);
  };
  useEffect(() => {
    if (isSubmitting) {
      console.log("Form is submitting...");
    }
  }, [isSubmitting]);
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div>
          <label>Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div>
          <label>Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.status && <span>{errors.status.message}</span>}
        </div>

        <div>
          <label>Missions</label>
          {missionFields.map((field, index) => {
            return (
              <div key={field.id}>
                <input
                  type="text"
                  {...register(`missions.${index}.mission` as const)}
                />
                {index > 0 && (
                  <button onClick={() => removeMission(index)}>delete</button>
                )}
              </div>
            );
          })}
          <div onClick={() => appendMission({ mission: "" })}>Add</div>
          {errors.missions &&
            errors.missions[0] &&
            errors.missions[0].mission && (
              <span>{errors.missions[0].mission.message}</span>
            )}
        </div>

        <div>
          <label>Skills</label>
          {skillFields.map((field, index) => {
            return (
              <div key={field.id}>
                <input
                  type="text"
                  {...register(`skills.${index}.skill` as const)}
                />
                {index > 0 && (
                  <button onClick={() => removeSkill(index)}>delete</button>
                )}
              </div>
            );
          })}
          <button onClick={() => appendSkill({ skill: "" })}>Add</button>
          {errors.skills && errors.skills[0] && errors.skills[0].skill && (
            <span>{errors.skills[0].skill.message}</span>
          )}
        </div>
        <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          Submit
        </button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default JobForm;
