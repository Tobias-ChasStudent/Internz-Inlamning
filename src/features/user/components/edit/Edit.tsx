import { useEffect, useState } from "react";
import useAuthState from "../../hooks/useAuthState";
import { motion } from "framer-motion";
import CompanyAccountForm from "./CompanyAccountForm";
import StudentAccountForm from "./StudentAccountForm";
import SecurityForm from "./SecurityForm";
import CompanyForm from "./CompanyForm";
import { getCompanyById, getUserAuthProvider } from "../../api";

const Edit = () => {
  const { user } = useAuthState();
  const [mode, setMode] = useState("account");
  const [company, setCompany] = useState<CompanyFormTypes | null>(null);
  const [authProvider, setAuthProvider] = useState<"email" | "google" | null>(
    null
  );

  const getAuthProvider = async () => {
    const provider = await getUserAuthProvider();
    console.log(provider);

    setAuthProvider(provider);
  };

  useEffect(() => {
    getAuthProvider();
  }, [user]);

  useEffect(() => {
    console.log(authProvider);
  }, [authProvider]);

  const handleCompany = async (companyId: string) => {
    try {
      const company = await getCompanyById(companyId);
      setCompany(company);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompanyDataChanged = () => {
    if (user?.company) handleCompany(user.company);
  };

  useEffect(() => {
    if (user?.company) {
      handleCompany(user.company);
    }

    window.addEventListener("company-data-changed", handleCompanyDataChanged);

    return () => {
      // Remove the event listener for 'company-data-changed' when the component is unmounted
      window.removeEventListener(
        "company-data-changed",
        handleCompanyDataChanged
      );
    };
  }, [user?.company]);

  const handleMode = (mode: string) => {
    setMode(mode);
  };

  const getForm = () => {
    switch (mode) {
      case "account":
        return user?.type === "company" ? (
          <CompanyAccountForm user={user} />
        ) : (
          <StudentAccountForm user={user} />
        );
      case "security":
        return <SecurityForm user={user} />;
      case "company":
        return <CompanyForm user={user} company={company} />;
    }
  };

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="flex justify-center gap-4">
        <div className="relative">
          <button
            onClick={() => handleMode("account")}
            className="relative z-10 rounded-xl p-2 text-primary"
          >
            Account
          </button>
          {mode === "account" && (
            <motion.div
              transition={{ type: "tween", duration: 0.15 }}
              layoutId="edit-highlight"
              className="absolute inset-0 rounded-xl bg-white"
            />
          )}
        </div>
        {user?.company && (
          <div className="relative">
            <button
              onClick={() => handleMode("company")}
              className="relative z-10 rounded-xl p-2 text-primary"
            >
              Company
            </button>
            {mode === "company" && (
              <motion.div
                transition={{ type: "tween", duration: 0.15 }}
                layoutId="edit-highlight"
                className="absolute inset-0 rounded-xl bg-white"
              />
            )}
          </div>
        )}
        {authProvider === "email" && (
          <div className="relative">
            <button
              onClick={() => handleMode("security")}
              className="relative z-10 rounded-xl p-2 text-primary"
            >
              Security
            </button>
            {mode === "security" && (
              <motion.div
                transition={{ type: "tween", duration: 0.15 }}
                layoutId="edit-highlight"
                className="absolute inset-0 rounded-xl bg-white"
              />
            )}
          </div>
        )}
      </div>
      {getForm()}
    </div>
  );
};

export default Edit;
