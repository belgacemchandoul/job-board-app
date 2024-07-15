"use client";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  title: string;
  description: string;
  status: boolean;
  missions: {
    test: string;
  }[];
  profiles: {
    test: string;
  }[];
  missionsTest: {
    test: string;
  }[];
};

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.boolean().required("Status is required"),
  missions: yup
    .array()
    .of(
      yup.object().shape({
        test: yup.string().required("Mission test is required"),
      })
    )
    .required(),
  profiles: yup
    .array()
    .of(
      yup.object().shape({
        test: yup.string().required("Profile test is required"),
      })
    )
    .required(),
  missionsTest: yup
    .array()
    .of(
      yup.object().shape({
        test: yup.string().required("Profile test is required"),
      })
    )
    .required(),
});

interface JobFormProps {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues?: FormValues;
}
const JobForm: React.FC<JobFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      status: false,
      missions: [{ test: "" }],
      profiles: [{ test: "" }],
      missionsTest: [{ test: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "missionsTest",
    control,
  });
  return (
    <div className="flex gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            render={({ field }) => <input {...field} />}
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
          <Controller
            name="missions.0.test"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.missions && errors.missions[0] && errors.missions[0].test && (
            <span>{errors.missions[0].test.message}</span>
          )}
        </div>

        <div>
          <label>Profiles</label>
          <Controller
            name="profiles.0.test"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.profiles && errors.profiles[0] && errors.profiles[0].test && (
            <span>{errors.profiles[0].test.message}</span>
          )}
        </div>
        <div>
          <label>test</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`missionsTest.${index}.test` as const)}
                  />
                  {index > 0 && (
                    <button onClick={() => remove(index)}>remove</button>
                  )}
                </div>
              );
            })}
          </div>
          <button onClick={() => append({ test: "" })}>add</button>
        </div>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default JobForm;
