import { useEffect, useRef } from "react";

const useFirstMount = () => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return isFirstMount.current;
};

export default useFirstMount;
