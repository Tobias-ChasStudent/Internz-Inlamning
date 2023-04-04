import { Header } from "../components/Layout";
import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    //fit-content validerar ej
    // <div className="grid grid-rows-[fit-content,_auto] gap-3">
    <div className="grid grid-rows-[_auto] gap-3">

      <Header />
      <div className="grid grid-cols-main justify-center px-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
