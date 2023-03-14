import { LinkType } from "../../types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Indicator from "./Indicator";

type LinkProps = { indicatorMode: "horizontal" | "vertical" } & LinkType;

const Link = ({ path, text, indicatorMode }: LinkProps) => {
  const location = useLocation().pathname === path;

  return (
    <li className="relative flex items-center max-sm:py-2 max-sm:px-4 sm:h-14 sm:justify-center">
      <RouterLink to={path} className="relative capitalize transition-all ">
        {text}
      </RouterLink>
      {location && <Indicator mode={indicatorMode} />}
    </li>
  );
};

export default Link;
