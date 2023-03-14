import { motion } from "framer-motion";

const Indicator = () => {
  return (
    <motion.div
      layoutId="indicator"
      transition={{ type: "spring", duration: 0.2 }}
      className="absolute bottom-0 h-1 w-4 rounded-t-full bg-accnet"
    />
  );
};

export default Indicator;
