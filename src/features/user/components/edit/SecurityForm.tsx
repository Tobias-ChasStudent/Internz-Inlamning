import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../../../components/elements/form/TextInput";
import { updateUserPassword } from "../../api";

interface CompanyAccountPops {
  user: UserType | null;
}

const SecurityForm = ({ user }: CompanyAccountPops) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecurityFormInputs>();

  const onSubmit: SubmitHandler<SecurityFormInputs> = async (data) => {
    try {
      console.log(data);
      if (data.password) console.log("true");

      if (data.password)
        await updateUserPassword(data.current_password, data.password);
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
        <div className="flex flex-col gap-2">
          <TextInput
            id="current_password"
            label="Change password"
            register={register}
            error={errors.current_password}
            placeholder="Current password"
          />
          <TextInput
            id="password"
            label=""
            register={register}
            error={errors.password}
            placeholder="New password"
          />
          <TextInput
            id="password_confirm"
            label=""
            register={register}
            error={errors.password_confirm}
            placeholder="Confirm new password"
          />
        </div>
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

export default SecurityForm;
