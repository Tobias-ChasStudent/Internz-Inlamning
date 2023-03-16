import React, { useEffect } from "react";
import { reloadCurrentUser } from "../../api";

const Verify = () => {
  const handleCheckVerify = async () => {
    await reloadCurrentUser();
  };

  return (
    <div className="flex flex-col gap-3 text-center">
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
    </div>
  );
};

export default Verify;
