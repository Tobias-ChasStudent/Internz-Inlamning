import { FcGoogle } from "react-icons/fc";

const ContinueWithGoogleButton = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary p-2 text-sm">
      <FcGoogle className="text-2xl" />
      Continue with google
    </div>
  );
};

export default ContinueWithGoogleButton;
