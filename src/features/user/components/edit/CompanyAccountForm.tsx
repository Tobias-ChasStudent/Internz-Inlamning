import { SubmitHandler, useForm } from "react-hook-form";
import PictureInput from "../../../../components/elements/form/PictureInput";
import TextAreaInput from "../../../../components/elements/form/TextAreaInput";
import TextInput from "../../../../components/elements/form/TextInput";
import { updateAccount } from "../../api";

interface CompanyAccountFormProps {
  user: UserType | null;
}

const CompanyAccountForm = ({ user }: CompanyAccountFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditCompanyAccountFormInputs>();

  const onSubmit: SubmitHandler<EditCompanyAccountFormInputs> = async (
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
            `https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg`
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
          placeholder={user?.username || "Full name"}
        />
        <TextInput
          id="phone"
          label="Phone number"
          register={register}
          error={errors.phone}
          placeholder={user?.phone || "e.g. 0701231234"}
        />
        <TextAreaInput
          id="introduction"
          label="Introduction"
          register={register}
          error={errors.introduction}
          placeholder={
            user?.introduction || "Write a short introduction about yourself"
          }
        />
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

export default CompanyAccountForm;
