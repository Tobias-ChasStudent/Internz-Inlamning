import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";

const inputClassName = (error: FieldError | undefined) =>
  `h-10 w-full rounded-xl bg-secondary pl-3 pr-10 text-sm outline-none ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

const New = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewFormTypes>();

  const onSubmit: SubmitHandler<NewFormTypes> = async (data) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-flow-row grid-cols-[minmax(auto,800px)] justify-center gap-3 rounded-xl bg-primary p-3">
      <header className="text-center text-2xl text-primary">
        What position are you hiring for?
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="position text-sm">Position</label>
          <input
            id="position"
            type="text"
            placeholder="Ex. Fullstack Developer "
            {...register("position", { required: true })}
            className={inputClassName(errors.position)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            placeholder="Describe the responsibilities"
            className="rounded-xl bg-secondary p-3 text-sm outline-none"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-primary">Scope</div>
          <label
            htmlFor="full_time"
            className="flex items-center gap-2 rounded-xl bg-secondary py-2 px-3"
          >
            <div className="relative grid h-4 w-4 place-items-center">
              <input
                id="full_time"
                type="checkbox"
                {...register("scope", { required: true })}
                value="full_time"
                className="peer absolute h-full w-full appearance-none rounded-[4px] bg-tertiary transition-colors duration-200 checked:bg-accnet"
              />
              <IoCheckmark className="aboslute pointer-events-none z-10 hidden text-xs text-white peer-checked:block" />
            </div>
            Full time
          </label>
          <label
            htmlFor="part_time"
            className="flex items-center gap-2 rounded-xl bg-secondary py-2 px-3"
          >
            <div className="relative grid h-4 w-4 place-items-center">
              <input
                id="part_time"
                type="checkbox"
                {...register("scope", { required: true })}
                value="part_time"
                className="peer absolute h-full w-full appearance-none rounded-[4px] bg-tertiary transition-colors duration-200 checked:bg-accnet"
              />
              <IoCheckmark className="aboslute pointer-events-none z-10 hidden text-xs text-white peer-checked:block" />
            </div>
            Part time
          </label>
        </div>
        <button type="submit" className="rounded-xl bg-black py-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default New;
