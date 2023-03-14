import { motion } from "framer-motion";

type IndicatorProps = {
  mode: "vertical" | "horizontal";
};

const Indicator = ({ mode }: IndicatorProps) => {
  return (
    <motion.div
      layoutId={mode}
      transition={{ type: "spring", duration: 0.2 }}
      className="absolute z-10 bg-accnet max-sm:left-0 max-sm:h-4 max-sm:w-1 max-sm:rounded-r-full sm:bottom-0 sm:h-1 sm:w-4 sm:rounded-t-full"
    />
  );
};

export default Indicator;
