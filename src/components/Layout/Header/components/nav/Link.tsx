import { LinkType } from "../../types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Indicator from "./Indicator";

type LinkProps = LinkType;

const Link = ({ path, text }: LinkProps) => {
  const location = useLocation().pathname === path;

  return (
    <li className="relative flex h-14 items-center justify-center ">
      <RouterLink to={path} className="relative capitalize transition-all ">
        {text}
      </RouterLink>
      {location && <Indicator />}
    </li>
  );
};

export default Link;
