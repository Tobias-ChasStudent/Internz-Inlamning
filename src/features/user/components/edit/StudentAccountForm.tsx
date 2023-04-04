import { SubmitHandler, useForm } from "react-hook-form";
import DateInput from "../../../../components/elements/form/DateInput";
import PictureInput from "../../../../components/elements/form/PictureInput";
import TagInput from "../../../../components/elements/form/TagInput";
import TextAreaInput from "../../../../components/elements/form/TextAreaInput";
import TextInput from "../../../../components/elements/form/TextInput";
import { updateAccount } from "../../api";

interface StudentAccountFormProps {
  user: UserType | null;
}

const StudentAccountForm = ({ user }: StudentAccountFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditStudentAccountFormInputs>();

  const onSubmit: SubmitHandler<EditStudentAccountFormInputs> = async (
    data
  ) => {
    try {
      if (user && user.id) {
        await updateAccount(user.id, data);
        reset();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="rounded-xl bg-white p-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <PictureInput
          preview={
            user?.photo ||
            `https://ui-avatars.com/api/?name=${user?.username}&background=random`
          }
          id="photo"
          label="Avatar"
          register={register}
          error={errors.photo}
        />
        <TextInput
          id="username"
          label="Name"
          register={register}
          error={errors.username}
          placeholder={user?.username}
          required={!!!user?.username}
        />
        <TextInput
          id="title"
          label="Title"
          register={register}
          error={errors.title}
          placeholder={user?.title || "e.g. Fullstack Developer"}
          required={!!!user?.title}
        />
        <TextInput
          id="education"
          label="Education"
          register={register}
          error={errors.phone}
          placeholder={user?.education || "e.g. Chas Academy"}
          required={!!!user?.education}
        />
        <TextInput
          id="phone"
          label="Phone number"
          register={register}
          error={errors.phone}
          placeholder={user?.phone || "e.g. 0701231234"}
          required={!!!user?.phone}
        />
        <TextInput
          id="location"
          label="Location"
          register={register}
          error={errors.location}
          placeholder={user?.location || "e.g. Stockholm"}
          required={!!!user?.location}
        />
        <TextAreaInput
          id="introduction"
          label="Introduction"
          register={register}
          error={errors.introduction}
          placeholder={
            user?.introduction || "Write a short introduction about yourself"
          }
          required={!!!user?.introduction}
        />
        <DateInput
          id="start_date"
          label="Internship start"
          register={register}
          error={errors.start_date}
        />
        <DateInput
          id="end_date"
          label="Internship end"
          register={register}
          error={errors.end_date}
        />
        <TagInput name="skills" control={control} />
        <button
          type="submit"
          className="rounded-xl bg-black py-2 px-3 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default StudentAccountForm;
