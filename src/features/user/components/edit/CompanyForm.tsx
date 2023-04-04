import { SubmitHandler, useForm } from "react-hook-form";
import PictureInput from "../../../../components/elements/form/PictureInput";
import TextAreaInput from "../../../../components/elements/form/TextAreaInput";
import TextInput from "../../../../components/elements/form/TextInput";
import { updateCompanyById } from "../../api";

interface CompanyAccountPops {
  user: UserType | null;
  company: EditCompanyFormInputs | null;
}

const CompanyForm = ({ user, company }: CompanyAccountPops) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditCompanyFormInputs>();

  const onSubmit: SubmitHandler<EditCompanyFormInputs> = async (data) => {
    try {
      if (user && user.company) {
        await updateCompanyById(user.company, data);
        const companyDataChangedEvent = new CustomEvent("company-data-changed");
        window.dispatchEvent(companyDataChangedEvent);
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
            (company?.logo as string) ||
            `https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg`
          }
          id="logo"
          label="Logo"
          register={register}
          error={errors.logo}
        />
        <TextInput
          id="name"
          label="Name"
          register={register}
          error={errors.name}
          placeholder={company?.name || "Company name"}
        />
        <TextInput
          id="url"
          label="URL"
          register={register}
          error={errors.url}
          placeholder={company?.url || "e.g. 0701231234"}
        />
        <TextAreaInput
          id="description"
          label="Description"
          register={register}
          error={errors.description}
          placeholder={
            company?.description ||
            "Write a short description about the company"
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

export default CompanyForm;
