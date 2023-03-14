import { useState } from "react";

type UseToggleType = [boolean, () => void];

function useToggle(initialState: boolean = false): UseToggleType {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = (): void => {
    setState((state) => !state);
  };

  return [state, toggle];
}

export default useToggle;
