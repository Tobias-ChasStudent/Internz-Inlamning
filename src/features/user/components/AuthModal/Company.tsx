import ContinueWithGoogleButton from "./ContinueWithGoogleButton";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { useState } from "react";
import { registerCompany, registerWithEmailAndPassword } from "../../api";

const inputClassName = (error: FieldError | undefined) =>
  `h-10 w-full rounded-xl bg-secondary pl-3 pr-10 text-sm outline-none ${
    error ? "border-2 border-red-400" : "border-2 border-transparent"
  }`;

const Company = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyFormTypes>();

  const onSubmit: SubmitHandler<CompanyFormTypes> = async (data) => {
    try {
      await registerCompany(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <ContinueWithGoogleButton />
      or
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            id="company"
            accept="image/*"
            {...register("logo", { required: true })}
            className=""
          />
        </div>
        <input
          type="text"
          placeholder="URL"
          {...register("url", { required: true })}
          className={inputClassName(errors.url)}
        />
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
          className={inputClassName(errors.name)}
        />
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className={`h-20 rounded-xl bg-secondary px-3 py-2 outline-none ${
            errors.description
              ? "border-2 border-red-400"
              : "border-2 border-transparent"
          }`}
        />
        <button type="submit" className="rounded-xl bg-black py-2 text-white">
          Create
        </button>
      </form>
    </div>
  );
};

export default Company;
