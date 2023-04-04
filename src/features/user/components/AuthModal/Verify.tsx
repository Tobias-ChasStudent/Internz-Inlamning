import { reloadCurrentUser } from "../../api";
import { motion } from "framer-motion";

const Verify = () => {
  const handleCheckVerify = async () => {
    await reloadCurrentUser();
  };

  return (
    <motion.aside
      initial={{ translateX: 32 }}
      animate={{ translateX: 0 }}
      className="flex flex-col gap-3 text-center"
    >
      <div>
        <div className="font-semibold">Verification link sent!</div>
        <div>Check your inbox to complete registration</div>
      </div>
      <button className="h-10 rounded-xl bg-secondary text-sm text-primary">
        Resend verification
      </button>
      <button
        onClick={handleCheckVerify}
        className="h-10 rounded-xl bg-accnet text-sm text-white"
      >
        Check verification
      </button>
    </motion.aside>
  );
};

export default Verify;
