import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle, registerWithGoogle } from "../../api";

type Props = {
  type?: AccountType | null;
};

const ContinueWithGoogleButton = ({ type = null }: Props) => {
  const handleGoogleLogin = async () => {
    try {
      if (type) await registerWithGoogle(type);
      else await loginWithGoogle();
    } catch (e) {}
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary p-2 text-sm"
    >
      <FcGoogle className="text-2xl" />
      Continue with google
    </button>
  );
};

export default ContinueWithGoogleButton;
