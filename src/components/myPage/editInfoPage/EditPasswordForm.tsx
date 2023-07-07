import Authentication from "@/components/findPasswordPage/Authentication";
import ResetPassword from "@/components/findPasswordPage/ResetPassword";
import { useState } from "react";
import CheckUserEmail from "./CheckUserEmail";

function EditPasswordForm({ email }: { email: string }) {
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmit = () => {
    setIsAuthenticated(true);
  };

  const moveToAuthentication = () => {
    setIsUserEmail(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <ResetPassword />
      ) : isUserEmail ? (
        <Authentication userEmail={email} onSubmit={onSubmit} />
      ) : (
        <CheckUserEmail email={email} moveToAuthentication={moveToAuthentication} />
      )}
    </>
  );
}

export default EditPasswordForm;
