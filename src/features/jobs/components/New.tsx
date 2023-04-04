import { SubmitHandler, useForm } from "react-hook-form";
import DateInput from "../../../components/elements/form/DateInput";
import MultipleCheckboxInputs from "../../../components/elements/form/MultipleCheckboxInputs";
import TagInput from "../../../components/elements/form/TagInput";
import TextAreaInput from "../../../components/elements/form/TextAreaInput";
import TextInput from "../../../components/elements/form/TextInput";
import { createJob } from "../api/createJob";

const New = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewFormTypes>();

  const onSubmit: SubmitHandler<NewFormTypes> = async (data) => {
    try {
      await createJob(data);
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  const scopeOptions = [
    { value: "full_time", label: "Full time" },
    { value: "part_time", label: "Part time" },
  ];

  const locationOptions = [
    { value: "on_site", label: "On site" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
  ];

  return (
    <main className="grid grid-flow-row grid-cols-[minmax(auto,640px)] justify-center gap-3 rounded-xl bg-primary p-3">
      <header className="text-center text-2xl text-primary">
        Enter details about the new job.
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <TextInput
          id="position"
          label="Position"
          register={register}
          error={errors.position}
          placeholder="Ex. Fullstack Developer"
        />
        <TextAreaInput
          id="description"
          label="Description"
          register={register}
          error={errors.description}
          placeholder="Describe the position's job duties and responsibilities"
        />
        <MultipleCheckboxInputs
          title="Scope"
          id="scope"
          error={errors.scope}
          register={register}
          checkboxes={scopeOptions}
        />
        <DateInput
          id="start_date"
          label="Start date"
          register={register}
          error={errors.start_date}
        />
        <DateInput
          id="end_date"
          label="End date"
          register={register}
          error={errors.end_date}
        />
        <TextInput
          id="city"
          label="City"
          register={register}
          error={errors.city}
          placeholder="Ex. Stockholm"
        />
        <MultipleCheckboxInputs
          title="Location"
          id="location"
          error={errors.location}
          register={register}
          checkboxes={locationOptions}
        />
        <TagInput name="tags" control={control} />
        <button type="submit" className="rounded-xl bg-black py-2 text-white">
          Submit
        </button>
      </form>
    </main>
  );
};

export default New;
